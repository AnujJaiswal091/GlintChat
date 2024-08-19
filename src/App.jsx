import React, { useEffect } from "react";
import Detail from "./components/detail/Detail";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserInfo(user?.uid);
      } else {
        fetchUserInfo(null);
      }
    });
 
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);


  return (
    <div className="bg-hero-pattern bg-cover h-screen flex items-center justify-center">
      {/* BODY */}
      <div className="flex h-screen w-screen bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] text-white rounded-lg shadow-black shadow-2xl">
        {/* CONTAINER */}
        {isLoading ? (
          <div className="flex w-[100%] justify-center items-center "><h1 className="p-12 text-4xl rounded-lg bg-[rgba(17,25,40,0.9)]">Loading...</h1></div>
        ) : currentUser ? (
          <div className="flex flex-grow">
            <List />
            {chatId && <Chat />}
            {chatId && <Detail />}
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Login />
          </div>
        )}
      </div>
      <Notification />
    </div>
  );
}

export default App;
