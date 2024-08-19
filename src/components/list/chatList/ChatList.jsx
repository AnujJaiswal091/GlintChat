import React, { useEffect, useState } from 'react';
import AddUser from './addUser/AddUser';
import { doc, onSnapshot, getDoc, updateDoc } from 'firebase/firestore';
import { useUserStore } from '../../../lib/userStore';
import { db } from '../../../lib/firebase';
import { useChatStore } from '../../../lib/chatStore';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
    const [chats, setChats] = useState([]);
    const [input, setInput] = useState("");
     
    const { currentUser } = useUserStore();
    const { chatId, changeChat } = useChatStore();

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            const items = res.data().chats;
    
            const promises = items.map(async (item) => {
              const userDocRef = doc(db, "users", item.receiverId);
              const userDocSnap = await getDoc(userDocRef);
    
              const user = userDocSnap.data();
    
              return { ...item, user };
            });
    
            const chatData = await Promise.all(promises);
    
            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
          }
        );
    
        return () => {
          unSub();
        };
        
      }, [currentUser.id]);


      const handleSelect = async (chat) => {
        const userChats = chats.map((item) => {
          const { user, ...rest } = item;
          return rest;
        });
    
        const chatIndex = userChats.findIndex(
          (item) => item.chatId === chat.chatId
        );
    
        userChats[chatIndex].isSeen = true;
    
        const userChatsRef = doc(db, "userchats", currentUser.id);
    
        try {
          await updateDoc(userChatsRef, {
            chats: userChats,
          });
          changeChat(chat.chatId, chat.user);
        } catch (err) {
          console.log(err);
        }
      };

      const filteredChats = chats.filter((c) =>
        c.user.username.toLowerCase().includes(input.toLowerCase())
      );


    return (
        <div className='flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>{/*ChatList */}

            <div className='flex items-center gap-5 p-5'>{/*Search\*/}

                <div className='flex-1 bg-blue-950 bg-opacity-50 flex items-center gap-5 rounded-lg'>{/*SearchBar */}
                    <img className='h-5 w-5 m-3' src="./search.png" alt="" />
                    <input className='bg-transparent outline-none text-white flex-1' type="text" placeholder='Search'  onChange={(e) => setInput(e.target.value)} />
                </div>

                <img className='h-11 w-11 bg-blue-950 rounded-lg p-3 cursor-pointer' src={addMode ? "./minus.png" : "./plus.png"} alt="" 
                    onClick={() => setAddMode(!addMode)} /> {/*Add */}
            </div>

            {filteredChats.map((chat) => (
                <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600' 
                key={chat.chatId}
                onClick={() => handleSelect(chat)}
                style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}}>{/*Item */}
                    <img className='rounded-full object-cover h-12 w-12' src={chat.user.blocked.includes(currentUser.id)
                    ? "./avatar.png"
                    : chat.user.avatar || "./avatar.png"} alt="" />
                    <div className='flex-col gap-3'>{/*texts */}
                        <span className='font-medium'>{chat.user.blocked.includes(currentUser.id)
                        ? "User"
                        : chat.user.username}</span>
                        <p className='text-sm font-normal py-1 '>{chat.lastMessage}</p>
                    </div>
                </div>
            ))}

            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
