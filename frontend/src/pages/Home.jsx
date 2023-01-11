import React,{useState} from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { MessagesContainer } from '../components/MessagesContainer'
import { InputMessage } from '../components/InputMessage'
import {useCookies} from 'react-cookie'
import {useNavigate} from 'react-router-dom' 
import { Profile } from '../components/Profile'
import { verifyToken } from '../utils'

export const Home = () => {
  const [user, setUser] = useState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cookies, setCookies, removeCookies] = useCookies([]);
  const navigate = useNavigate();

  useEffect(()=>{
    const verify = async()=>{
      const data = await verifyToken(cookies, removeCookies, navigate)
      setUser(data)
    }
    verify()
  },[])

  useEffect(() => {
    axios.get('http://localhost:3000/messages').then(res => {
      setMessages(res.data.data)
      setLoading(false)
    })
  }, [user]) 

  const onSubmitHandler = data => {
    axios.post('http://localhost:3000/messages/add', {
      text: data.text,
      from: user
    }).then(() => console.log("success")) 
    .catch(err => console.log("failed"))
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
      <div className="bg-[#393E46] rounded-lg px-3 py-2">
        <Profile username={user} logoutHandler={logoutHandler}></Profile>
        <MessagesContainer messages={messages} user={user}></MessagesContainer>
        <InputMessage onSubmitHandler={onSubmitHandler}></InputMessage>
      </div>
    </div>
  )
}
