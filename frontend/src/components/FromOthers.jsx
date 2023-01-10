import React from 'react'

export const FromOthers = ({from, text, index}) => {
  return (
    <div key={index} className='bg-[#393E46] min-w-[20px] p-4 max-w-[50%] rounded-xl'>
      <h5 className='font-bold'>{from}</h5>
      <p>{text}</p>
    </div>
  )
}
