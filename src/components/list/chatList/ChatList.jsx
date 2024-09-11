import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser.jsx";
import { useUserStore } from "../../../lib/userStore.js";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase.js";
import { useChatStore } from "../../../lib/chatStore.js";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const { currentUser } = useUserStore();
  const { chatId, changeChat } = useChatStore();

  useEffect(() => {
    // Setting up a real-time listener on the 'userchats' document for the current user
    const unSub = onSnapshot(
      // Specify the document to listen to: "userchats" collection, current user's document
      doc(db, "userchats", currentUser.id),

      // Callback function triggered whenever the document changes
      async (res) => {
        // 'res' is a snapshot of the document, containing current data of 'userchats'
        // Extracting the 'chats' array from the document's data
        const items = res.data().chats;

        // Mapping through each chat item to fetch corresponding user data
        const promises = items.map(async (item) => {
          // Creating a reference to the 'users' document of the chat's receiver
          const userDocRef = doc(db, "users", item.receiverId);

          // Fetching the receiver's user data from Firestore
          const userDocSnap = await getDoc(userDocRef);

          // Extracting the user data from the snapshot
          const user = userDocSnap.data();

          // Returning the original chat item combined with the fetched user data
          return { ...item, user };
        });

        // Resolving all promises to get the full chat data array including user information
        const chatData = await Promise.all(promises);

        // Sorting the chats based on 'updatedAt' to display the most recent chats first
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );

    // Cleanup function: Unsubscribing from the listener when the component unmounts or dependency changes
    return () => {
      unSub(); // Calling the function to stop listening to changes in the Firestore document
    };

    // Dependency array: this effect runs when 'currentUser.id' changes
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    // Logging the selected chat object for debugging
    console.log(chat);

    // Creating a new array of userChats without the nested user data
    const userChats = chats.map((item) => {
      // Destructuring to remove the 'user' object, keeping only chat-related data
      const { user, ...rest } = item;
      return rest; // Returning the rest of the chat data without the user info
    });

    // Finding the index of the selected chat in the 'userChats' array
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId // Matching chat by 'chatId'
    );

    // Marking the selected chat as seen by setting 'isSeen' to true
    userChats[chatIndex].isSeen = true;

    // Creating a reference to the current user's 'userchats' document in Firestore
    const userChatsRef = doc(db, "userchats", currentUser.id);

    try {
      // Updating the 'userchats' document in Firestore with the modified chats array
      await updateDoc(userChatsRef, {
        chats: userChats, // Updating the chats with the marked 'isSeen' flag
      });

      // Changing the current active chat using the Zustand state management action
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      // Catching any errors that occur during the Firestore update or state change
      console.log(err); // Logging errors to the console for debugging
    }
  };

  const filteredChats = chats.filter(
    (
      c //If input is an empty string (""), the .includes() method will always return true for any string because every string includes an empty string.
    ) => c.user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
      {/*ChatList */}

      <div className="flex items-center gap-5 p-5">
        {/*Search\*/}
        <div className="flex-1 bg-blue-950 bg-opacity-50 flex items-center gap-5 rounded-lg">
          {/*SearchBar */}
          <img className="h-5 w-5 m-3" src="./search.png" alt="" />
          <input
            className="bg-transparent outline-none text-white flex-1"
            type="text"
            placeholder="Search"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <img
          className="h-11 w-11 bg-blue-950 rounded-lg p-3 cursor-pointer"
          src={addMode ? "./minus.png" : "./plus.png"}
          alt=""
          onClick={() => setAddMode(!addMode)}
        />{" "}
        {/*Add */}
      </div>

      {filteredChats.map((chat) => (
        <div
          className="flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600"
          key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{ backgroundColor: chat?.isSeen ? "transparent" : "#5183fe" }}
        >
          {/*Item */}
          <img
            className="rounded-full object-cover h-12 w-12"
            src={
              chat.user.blocked.includes(currentUser.id)
                ? "./avatar.png"
                : chat.user.avatar || "./avatar.png"
            }
            alt=""
          />
          <div className="flex-col gap-3">
            {/*texts */}
            <span className="font-medium">
              {chat.user.blocked.includes(currentUser.id)
                ? "User"
                : chat.user.username}
            </span>
            <p className="text-sm font-normal py-1 ">{chat.lastMessage}</p>
          </div>
        </div>
      ))}

      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
