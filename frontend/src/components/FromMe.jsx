import React from 'react'

export const FromMe = ({text, from, index}) => {
  return (
    <div key={index} className="flex justify-end">
      <div className='bg-[#00ADB5] min-w-[92px] p-4 max-w-[60%] rounded-xl'>
        <h5 className='font-bold'>{from}</h5>
        <p>{text}</p>
      </div>
    </div>
  )
}
