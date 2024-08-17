import React from 'react'

const AddUser = () => {
  return (
    <div className='w-max h-max p-7 bg-[rgba(17,25,40,0.72)] rounded-xl absolute top-0 bottom-0 left-0 right-0 m-auto'> {/*AddUser */}
        <form className='flex gap-5'> 
            <input className='p-5 rounded-lg border-none outline-none' type="text" placeholder='Username' name='username' />
            <button className='p-5 rounded-lg bg-blue-700 text-white border-none cursor-pointer'>Search</button>
        </form>
        <div className='mt-12 flex items-center justify-between'>{/*User */}
            <div className='flex items-center gap-5'> {/**Detail */}
                <img  className='h-12 w-12 object-cover rounded-full' src="./avatar.png" alt="" />
                <span>Jane Doe</span>
            </div>
            <button className='p-2 rounded-lg bg-blue-700 text-white border-none cursor-pointer'>Add User</button>
        </div> 
    </div>
  )
}

export default AddUser
