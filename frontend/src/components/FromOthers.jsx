import React from 'react'

export const FromOthers = ({from, text, index}) => {
  return (
    <div className="flex justify-start">
      <div key={index} className='bg-[#393E46] min-w-[92px] p-4 max-w-[60%] rounded-xl justify-start'>
        <h5 className='font-bold'>{from}</h5>
        <p>{text}</p>
      </div>
    </div>
  )
}
