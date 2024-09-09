import React from 'react'
import { useUserStore   } from '../../../lib/userStore.js';

const UserInfo = () => {
  const { currentUser} = useUserStore();
  return (
    <div className='p-5 flex items-center justify-between'> {/*UserInfo */}

      <div className='gap-5 flex items-center'> {/*User */}
        <img className='h-12 w-12 rounded-full object-cover' src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
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
