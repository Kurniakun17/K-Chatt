import React, { useRef } from 'react'
import { useEffect } from 'react';
import { FromMe } from './FromMe';
import { FromOthers } from './FromOthers';

export const MessagesContainer = ({messages, user}) => {
  const lastMessage = useRef();

  useEffect(()=>{
    lastMessage.current.scrollIntoView({behaviour: "smooth"})
  },[messages])

  return (
    <div className="bg-[#222831] rounded-md mb-4 h-[600px] w-[600px] flex flex-col gap-2 px-2 py-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-600 pr-4 ">
      {messages.map((msg, index)=>{
        if(msg.from === user){
          return (
            <div key={index} ref={lastMessage}>
              <FromMe key={index} text={msg.text} from={msg.from} index={index}></FromMe>
            </div>
          )
        }else{
          return (
          <div key={index} ref={lastMessage}>
            <FromOthers text={msg.text} from={msg.from} index={index}></FromOthers>
          </div>
          )
        }
      })}
    </div>
  )
}
