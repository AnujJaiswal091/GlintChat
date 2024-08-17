import React, { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react'


const Chat = () => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("")
    const endRef = useRef(null);


    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    const handleEmoji =(e) => {
        setText((prev) => prev + e.emoji)
        setOpen(false)
    }
  return (
    <div className='flex flex-col flex-[2] border-l-[1px] border-r-[1px] border-gray-600 h-full'> {/*CHAT  */}

      <div className='p-5 flex items-center justify-between border-b-[1px] border-gray-600'> {/*Top */}
        <div className='flex items-center gap-5'> {/*User */}
            <img className='h-14 w-14 rounded-full object-cover' src="./avatar.png" alt="" />
            <div className='flex flex-col gap-2'>{/*Texts */}
                <span className='font-semibold text-lg'>Jane Doe</span>
                <p className='font-normal text-sm text-gray-400'>Lorem ipsum dolor sit amet</p>
            </div>
        </div>

        <div className='flex gap-5 cursor-pointer'> {/*Icons */}
            <img className='h-5 w-5 ' src="./phone.png" alt="" />
            <img className='h-5 w-5 ' src="./video.png" alt="" />
            <img className='h-5 w-5 ' src="./info.png" alt="" />
        </div>
    </div>

    <div className='flex-1 p-5 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent gap-5'> {/* Centre */}
    {/* Messages Container */}
        <div className='flex flex-col gap-5'>
            {/* Message from others (left-aligned) */}
            <div className='w-[70%] flex items-start gap-5'>
                <img className='h-9 w-9 object-cover rounded-full' src="./avatar.png" alt="" />
                <div>{/*Text */}
                    <img className='object-cover h-[300px] w-[100%] rounded-lg mb-1' src="https://images.pexels.com/photos/11746032/pexels-photo-11746032.jpeg" alt="" />
                    <div className='flex-col bg-slate-800 flex-1 bg-opacity-50 p-3 rounded-lg gap-1'>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, exercitationem!</p>
                    </div>
                    <span className='text-sm text-gray-400'>1 min ago</span>
                </div>
            </div>

            {/* Message from owner (right-aligned) */}
            <div className='w-[70%] flex-col self-end'>
                <img className='object-cover h-[300px] w-[100%] rounded-lg mb-1' src="https://images.pexels.com/photos/11746032/pexels-photo-11746032.jpeg" alt="" />
                <div className='bg-blue-700 text-white p-2 pl-3 rounded-lg'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, exercitationem!</p>
                </div>
                <span className='text-sm text-gray-400'>1 min ago</span>
            </div>
        </div>

        <div ref={endRef}>{/*Scroll functionality */}
        </div>
    </div>



    <div className='flex items-center justify-between p-5 gap-5 border-t-[1px] border-gray-600 mt-auto'> {/*Bottom */}

        <div className='gap-5 flex'> {/* Icons */}
            <img className='cursor-pointer h-5 w-5' src="./img.png" alt="" />
            <img className='cursor-pointer h-5 w-5' src="./camera.png" alt="" />
            <img className='cursor-pointer h-5 w-5' src="./mic.png" alt="" />
        </div> 

        <input 
            className='flex-1 bg-[rgba(23,37,84,0.5)] border-none outline-none p-4 rounded-lg text-lg text-white' 
            type="text" 
            placeholder='Type a message...' 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
        />

        <div className='relative'>
            {/* Emoji Button */}
            <img 
            className='h-5 w-5 cursor-pointer' 
            src="./emoji.png" 
            alt=""  
            onClick={() => setOpen((prev) => !prev)} 
            />
            
            {/* Emoji Picker */}
            {open && (
            <div className='absolute left-0 bottom-full mb-6 bg-white border rounded-lg shadow-lg z-50'>
                <EmojiPicker onEmojiClick={handleEmoji} theme='dark' />
            </div>
            )}
        </div>

            <button className='bg-blue-500 rounded-lg py-2 px-5 border-none'>
                Send
            </button>
        </div>
    </div>
  )
}

export default Chat
