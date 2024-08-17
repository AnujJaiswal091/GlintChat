import React, { useState } from 'react'
import AddUser from './addUser/AddUser';

const ChatList = () => {
    const [addMode, setAddMode] = useState(false);
  return (
    <div className='flex-1 overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent'>{/*ChatList */}

        <div className='flex items-center gap-5 p-5'>{/*Search\*/}

            <div className='flex-1 bg-blue-950 bg-opacity-50 flex items-center gap-5 rounded-lg'>{/*SearchBar */}
                <img className='h-5 w-5 m-3'  src="./search.png" alt="" />
                <input className='bg-transparent outline-none text-white flex-1' type="text" placeholder='Search' />
            </div>

            <img className='h-11 w-11 bg-blue-950 rounded-lg p-3 cursor-pointer' src={(addMode) ? "./minus.png" : "./plus.png"} alt="" 
            onClick={() => setAddMode(!addMode)}/> {/*Add */}

        </div>

        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-5 cursor-pointer border-b-[1px] border-b-slate-600'>{/*Item */}
            <img className='rounded-full object-cover h-12 w-12' src="./avatar.png" alt="" />
            <div className='flex-col gap-3'>{/*texts */}
                <span className='font-normal'>Jane Doe</span>
                <p className='text-sm font-light'>Hello</p>
            </div>
        </div>
        {addMode && <AddUser></AddUser>}
    </div>
  )
}

export default ChatList
