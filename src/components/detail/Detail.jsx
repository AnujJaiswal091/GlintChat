import React from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore.js";
import { useUserStore } from "../../lib/userStore.js";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../lib/firebase.js";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } =
    useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogOut = () => {
    resetChat();
    auth.signOut();
  }

  return (
    <div className="flex-1">
      {" "}
      {/*detail */}
      <div className="py-7 px-5 flex flex-col items-center gap-3 border-b-[1px] border-gray-600">
        {/*User */}
        <img
          className="h-24 w-24 rounded-full object-cover"
          src={user?.avatar || "./avatar.png"}
          alt=""
        />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet</p>
      </div>
      <div className="flex flex-col p-5 gap-6">
        {/*Info */}

        <div className="">
          {/*Option */}
          <div className="flex items-center justify-between">
            {/*Title */}
            <span>Privacy and Help</span>
            <img
              className="h-8 w-8 bg-blue-950 opacity-40 rounded-full p-2 cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>

        <div>
          {/*Option */}
          <div className="flex items-center justify-between">
            {/*Title */}
            <span>Chat Settings</span>
            <img
              className="h-8 w-8 bg-blue-950 opacity-40 rounded-full p-2 cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>

        <div>
          {/*Option */}
          <div className="flex items-center justify-between">
            {/*Title */}
            <span>Shared Photos</span>
            <img
              className="h-8 w-8 bg-blue-950 opacity-40 rounded-full p-2 cursor-pointer"
              src="./arrowDown.png"
              alt=""
            />
          </div>
          <div className="flex flex-col gap-5 mt-5">
            {/*Photos */}
            <div className="flex items-center justify-between">
              {/*PhotoItem */}

              <div className="flex items-center gap-5">
                {/*Photo Detail*/}
                <img
                  className="w-10 h-10 rounded-lg object-cover
                "
                  src="https://i.pinimg.com/564x/7b/ac/a7/7baca7ede91e41988ccb64fc729fc95e.jpg"
                  alt=""
                />
                <span className="text-md text-gray-400 font-light">
                  kurtegesat img
                </span>
              </div>
              <FileDownloadOutlinedIcon
                className="p-1 bg-blue-950 opacity-45 rounded-full  cursor-pointer"
                style={{ height: "2rem", width: "2rem" }}
              ></FileDownloadOutlinedIcon>
            </div>
          </div>
        </div>

        <div>
          {/*Option */}
          <div className="flex items-center justify-between">
            {/*Title */}
            <span>Shared Files</span>
            <img
              className="h-8 w-8 bg-blue-950 opacity-40 rounded-full p-2 cursor-pointer"
              src="./arrowUp.png"
              alt=""
            />
          </div>
        </div>

        <button
          className="cursor-pointer py-2 px-5 bg-[rgba(230,74,105,0.533)] hover:bg-[rgba(220,20,60,0.733)] text-white border-none rounded-lg"
          onClick={handleBlock}
        >
          {" "}
          {isCurrentUserBlocked
            ? "You are Blocked!"
            : isReceiverBlocked
            ? "User blocked"
            : "Block User"}
        </button>
        <button
          className="cursor-pointer py-2 px-5 bg-[rgba(23,37,84,0.5)] hover:bg-[rgba(29,78,216,0.7)] text-white border-none rounded-lg"
          onClick={() => handleLogOut()}
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Detail;
