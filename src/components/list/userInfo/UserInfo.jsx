import React from 'react'

const UserInfo = () => {
  return (
    <div className='p-5 flex items-center justify-between'> {/*UserInfo */}

      <div className='gap-5 flex items-center'> {/*User */}
        <img className='h-12 w-12 rounded-full object-cover' src="./avatar.png" alt="" />
        <h2>John Doe</h2>
      </div>

      <div className='flex gap-5 cursor-pointer' > {/*Icons */}
        <img className='h-5 w-5' src="./more.png" alt="" />
        <img className='h-5 w-5' src="./video.png" alt="" />
        <img className='h-5 w-5' src="./edit.png" alt="" />
      </div>

    </div>
  )
}

export default UserInfo
