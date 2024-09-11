import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { format } from "timeago.js";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();
  const endRef = useRef(null);

  useEffect(() => {
    if (chat?.messages) {
      endRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const upload = async (file) => {
    const storage = getStorage();
    const storageRef = ref(storage, `chat_images/${chatId}/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleSend = async () => {
    if (text === "" && !img.file) return;

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (e) {
      console.log(e);
    } finally {
      setImg({
        file: null,
        url: "",
      });

      setText("");
    }
  };

  return (
    <div className="flex flex-col flex-[2] border-l-[1px] border-r-[1px] border-gray-600 h-full">
      {/* Chat */}
      <div className="p-5 flex items-center justify-between border-b-[1px] border-gray-600">
        {/* Top */}
        <div className="flex items-center gap-5">
          {/* User */}
          <img
            className="h-14 w-14 rounded-full object-cover"
            src={user?.avatar || "./avatar.png"}
            alt=""
          />
          <div className="flex flex-col gap-2">
            {/* Texts */}
            <span className="font-semibold text-lg">{user?.username}</span>
            <p className="font-normal text-sm text-gray-400">
              Lorem ipsum dolor sit amet
            </p>
          </div>
        </div>

        <div className="flex gap-5 cursor-pointer">
          {/* Icons */}
          <img className="h-5 w-5 " src="./phone.png" alt="" />
          <img className="h-5 w-5 " src="./video.png" alt="" />
          <img className="h-5 w-5 " src="./info.png" alt="" />
        </div>
      </div>

      <div className="flex-1 p-5 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent gap-5">
        {/* Center */}
        <div className="flex flex-col gap-5">
          {/* Messages Container */}
          {chat?.messages?.map((message) =>
            message.senderId === currentUser.id ? (
              // Message from owner (right-aligned)
              <div
                className="w-auto max-w-[70%] self-end flex flex-col items-end"
                key={message.createdAt}
              >
                <div>
                  {message.img && (
                    <img
                      className="object-cover h-[300px] w-full rounded-lg mb-1"
                      src={message.img}
                      alt=""
                    />
                  )}
                  <div className="bg-blue-500 text-white p-3 rounded-lg">
                    <p>{message.text}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {format(message.createdAt.toDate())}
                  </span>
                </div>
              </div>
            ) : (
              // Message from others (left-aligned)
              <div
                className="w-auto max-w-[70%] flex items-start gap-5"
                key={message.createdAt}
              >
                <div>
                  {message.img && (
                    <img
                      className="object-cover h-[300px] w-full rounded-lg mb-1"
                      src={message.img}
                      alt=""
                    />
                  )}
                  <div className="bg-slate-800 bg-opacity-50 p-3 rounded-lg">
                    <p>{message.text}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {format(message.createdAt.toDate())}
                  </span>
                </div>
              </div>
            )
          )}

          {img.url && (
            <div className="message own">
              <div className="texts">
                <img src={img.url} alt="" />
              </div>
            </div>
          )}
        </div>

        <div ref={endRef}>{/* Scroll functionality */}</div>
      </div>

      <div className="flex items-center justify-between p-5 gap-5 border-t-[1px] border-gray-600 mt-auto">
        {/* Bottom */}
        <div className="gap-5 flex">
          {/* Icons */}
          <label htmlFor="file">
            <img className="cursor-pointer h-5 w-5" src="./img.png" alt="" />
          </label>

          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImg}
          />
          <img className="cursor-pointer h-5 w-5" src="./camera.png" alt="" />
          <img className="cursor-pointer h-5 w-5" src="./mic.png" alt="" />
        </div>

        <input
          className="flex-1 bg-[rgba(23,37,84,0.5)] border-none outline-none p-4 rounded-lg text-lg text-white disabled:cursor-not-allowed"
          type="text"
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "You cannot send a message"
              : "Type a message..."
          }
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />

        <div className="relative">
          {/* Emoji Button */}
          <img
            className="h-5 w-5 cursor-pointer"
            src="./emoji.png"
            alt=""
            onClick={() => setOpen((prev) => !prev)}
          />

          {/* Emoji Picker */}
          {open && (
            <div className="absolute left-0 bottom-full mb-6 bg-white border rounded-lg shadow-lg z-50">
              <EmojiPicker onEmojiClick={handleEmoji} theme="dark" />
            </div>
          )}
        </div>

        <button
          onClick={handleSend}
          className="bg-blue-500 rounded-lg py-2 px-5 border-none disabled:cursor-not-allowed"
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
