import React, { useRef } from 'react'
import { useEffect } from 'react';
import { FromMe } from './FromMe';
import { FromOthers } from './FromOthers';

export const MessagesContainer = ({messages, user}) => {
  const lastMessage = useRef();

  useEffect(()=>{
    lastMessage.current.scrollIntoView()
  },[])

  return (
    <div className="bg-[#EEEEEE] rounded-md mb-4 h-[600px] w-[600px] flex flex-col gap-2 p-2 overflow-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-600 pr-4">
      {messages.map((msg, index)=>{
        if(msg.from === user){
          return <FromMe key={index} text={msg.text} from={msg.from} index={index}></FromMe>;
        }else{
          return <FromOthers key={index} text={msg.text} from={msg.from} index={index}></FromOthers>;
        }
      })}
      <div ref={lastMessage}></div>
    </div>
  )
}
