import React from 'react'
import UserInfo from './userInfo/UserInfo'
import ChatList from './chatList/ChatList'

const List = () => {
  return (
    <div className='flex-1 flex flex-col'> {/* LIST */}
      <UserInfo></UserInfo>
      <ChatList></ChatList>
    </div>
  )
}

export default List
