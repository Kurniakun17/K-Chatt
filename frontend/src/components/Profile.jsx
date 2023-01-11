import React from 'react'
import {BiLogOut} from 'react-icons/bi'

export const Profile = ({username, logoutHandler}) => {
  return (
    <div className='p-4 bg-[#222831] rounded-lg my-3 flex justify-between items-center'>
      <h1 className='text-2xl font-bold'>Hi, {username}!</h1>
      <BiLogOut className='hover:cursor-pointer' onClick={logoutHandler} size={"28px"}></BiLogOut>
    </div>
  )
}
