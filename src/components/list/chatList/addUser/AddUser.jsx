import { db } from "../../../../lib/firebase.js";
import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";
import { toast } from "react-toastify";

const AddUser = () => {
  const [user, setUser] = useState(null);

  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      // Fetch current user's chats to check if the chat already exists
      const currentUserChatsDoc = await getDoc(
        doc(userChatsRef, currentUser.id)
      );
      const currentUserChats = currentUserChatsDoc.exists()
        ? currentUserChatsDoc.data().chats
        : [];

      // Check if the chat already exists with the selected user
      const isChatExisting = currentUserChats.some(
        (chat) => chat.receiverId === user.id
      );

      if (isChatExisting) {
        toast.error("User is already added to your chats.");
        return;
      }

      // Create a new chat document if the chat does not exist
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      // Update both users' chat lists
      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      toast.success("User added to your chats!");
    } catch (err) {
      console.log(err);
      toast.error("Failed to add user. Please try again.");
    }
  };

  return (
    <div className="w-max h-max p-7 bg-[rgba(17,25,40,0.72)] rounded-xl absolute top-0 bottom-0 left-0 right-0 m-auto">
      <form onSubmit={handleSearch} className="flex gap-5">
        <input
          className="p-5 rounded-lg border-none outline-none text-black"
          type="text"
          placeholder="Username"
          name="username"
        />
        <button className="p-5 rounded-lg bg-blue-700 text-white border-none cursor-pointer">
          Search
        </button>
      </form>

      {user && (
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <img
              className="h-12 w-12 object-cover rounded-full"
              src={user.avatar || "./avatar.png"}
              alt=""
            />
            <span>{user.username}</span>
          </div>
          <button
            className="p-2 rounded-lg bg-blue-700 text-white border-none cursor-pointer"
            onClick={handleAdd}
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
