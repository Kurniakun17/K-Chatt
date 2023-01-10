import React,{useState} from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import { useEffect } from 'react'
import { MessagesContainer } from '../components/MessagesContainer'
import { InputMessage } from '../components/InputMessage'

export const Home = () => {
  const [user, setUser] = useState('kurniakun17');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(()=>{
    axios.post('http://localhost:3000/auth/validatetoken')
  },[])
  useEffect(() => {
    axios.get('http://localhost:3000/messages').then(res => {
      console.log(res.data.data);
      setMessages(res.data.data)
      setLoading(false)
    })
  }, [])

  const onSubmitHandler = data => {
    axios.post('http://localhost:3000/messages/add', {
      text: data.text,
      from: user
    }).then(() => console.log("success"))
    .catch(err => console.log("failed"))
  }

  if(loading){
    return (
    <div className='absolute top-[50%] left-[50%] translate-x-0 translate-y-[-50%]'>
      <h1 className='text-3xl'>Loading...</h1>
    </div>)
  }

  return (
    <div className="min-h-[100vh] grid place-items-center">
      <div className="bg-[#393E46] rounded-lg px-3 py-2">
        <MessagesContainer messages={messages} user={user}></MessagesContainer>
        <InputMessage onSubmitHandler={onSubmitHandler}></InputMessage>
      </div>
    </div>
  )
}
