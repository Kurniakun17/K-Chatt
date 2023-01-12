import React,{useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { MessagesContainer } from '../components/MessagesContainer'
import { InputMessage } from '../components/InputMessage'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom' 
import { Profile } from '../components/Profile'
import { verifyToken } from '../utils'
import {io} from 'socket.io-client'

export const Home = () => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const [socket, setSocket] = useState();
  const navigate = useNavigate();

  useEffect(()=>{
    const verify = async()=>{
      const data = await verifyToken(cookies, removeCookies, navigate)
      if(data){
        setUser(data)
      }else{
        navigate('/login')
      }
    }
    verify()
  }, [])

  useEffect(() => {
    if(user){
      axios.get('http://localhost:3000/messages').then(res => {
        setMessages(res.data.data)
        setSocket(io('http://localhost:3000'))
        setLoading(false)
      })
    }
  }, [user]) 

  useEffect(() => {
    if(socket){
      socket.on('connect', () => {
      })
    }
  }, [socket])

  useEffect(() => {
    if(socket){
      socket.on('received-msg', msg => {
        setMessages(prevMessages => [...prevMessages, msg])
      })
    }
  }, [socket])

  const onSubmitHandler = data => {
    axios.post('http://localhost:3000/messages/add', {
      text: data.text,
      from: user
    }).then(() =>{
      socket.emit('send-msg', {
        text: data.text,
        from: user
      })
      setMessages(prevMessages=>[...prevMessages, {
        text: data.text,
        from: user
      }])
    })
    .catch(err => console.log(err))
  }

  const logoutHandler = () => {
    removeCookies('jwt')
    navigate('/login')
  }

  if(loading){
    return (
    <div className='absolute top-[50%] left-[50%] translate-x-0 translate-y-[-50%]'>
      <h1 className='text-3xl'>Loading...</h1>
    </div>)
  }

  return (
    <div className="min-h-[100vh] grid place-items-center">
      <div>
        <h1 className='text-[64px] font-extrabold text-center mb-5'><span className='text-[#00ADB5]'>K</span>-Chatt</h1>
        <div className="bg-[#393E46] rounded-lg px-3 py-2">
          <Profile username={user} logoutHandler={logoutHandler}></Profile>
          <MessagesContainer messages={messages} user={user}></MessagesContainer>
          <InputMessage onSubmitHandler={onSubmitHandler}></InputMessage>
        </div>
      </div>
    </div>
  )
}
