import React, { useEffect } from "react";
import Detail from "./components/detail/Detail.jsx";
import Chat from "./components/chat/Chat.jsx";
import List from "./components/list/List.jsx";
import Login from "./components/login/Login.jsx";
import Notification from "./components/notification/Notification.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase.js";
import { useUserStore } from "./lib/userStore.js";
import { useChatStore } from "./lib/chatStore.js";
import { ThreeDots } from "react-loader-spinner";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    // Setting up the listener on Firebase authentication state changes
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        // If the user is logged in, fetch the user's information using their UID
        fetchUserInfo(user?.uid);
      } else {
        // If no user is logged in, set the user information to null
        fetchUserInfo(null);
      }
    });

    // Cleanup function to unsubscribe from the listener when the component unmounts
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  return (
    <div className="bg-hero-pattern bg-cover h-screen flex items-center justify-center">
      {/* BODY */}
      <div className="flex h-screen w-screen bg-[rgba(17,25,40,0.75)] backdrop-blur-[5px] backdrop-saturate-[180%] text-white rounded-lg shadow-black shadow-2xl">
        {/* CONTAINER */}
        {isLoading ? (
          <div className="flex w-[100%] justify-center items-center ">
            <h1 className="p-8 rounded-lg bg-[rgba(17,25,40,0.9)]">
              <ThreeDots
                visible={true}
                height="120"
                width="120"
                color="#3b82f6"
                radius="9"
                ariaLabel="three-dots-loading"
              />
            </h1>
          </div>
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
};

export default App;
