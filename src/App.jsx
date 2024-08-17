import React from "react";
import Detail from "./components/detail/Detail";
import Chat from "./components/chat/Chat";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

const App = () => {
  const user = false;

  return (
    <div className="bg-hero-pattern bg-cover h-screen flex items-center justify-center">
      {/* BODY */}
      <div className="flex h-screen w-screen bg-[rgba(17,25,40,0.75)] backdrop-blur-[19px] backdrop-saturate-[180%] text-white rounded-lg shadow-black shadow-2xl">
        {/* CONTAINER */}
        {user ? (
          <div className="flex flex-grow">
            <List />
            <Chat />
            <Detail />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <Login />
          </div>
        )}
      </div>
      <Notification></Notification>
    </div>
  );
}

export default App;
