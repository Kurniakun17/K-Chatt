import React from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { InputForm } from '../components/InputForm';
import { useEffect } from 'react';
import {useCookies} from 'react-cookie';
import { verifyToken } from '../utils';


export const Login = () => {
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies]= useCookies();
  useEffect(()=>{
    verifyToken(cookies, removeCookies, navigate);
  },[])

  const FormArr = [
    {
      name: "Username",
      type: "text",
      minLength: 4
    },
    {
      name: "Password",
      type: "password",
      minLength: 6
    },
  ]

  const RegisterPhrase = (<p className='text-sm mt-5 text-center '>Didn't have an account? <Link to={'/register'} className='text-[#00ADB5]'>Register</Link></p>);

  const onLoginSubmit = data => {
    axios.post('http://localhost:3000/auth/login',{
      username: data.Username,
      password: data.Password
    },{
      withCredentials: true
    }).then(res => res.data)
    .then(data=>{
      if(data.status){
        
        navigate('/home')
      }else{
        // Toastify failed
      }
    }).catch(err => console.log(err.message))
  }

  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-25px] ml-[-25px] w-[440px] border border-slate-300 rounded-xl text-[#222831] bg-white text-lg'>
    <InputForm FormArr={FormArr} title="Login" phrase={RegisterPhrase} onSubmit={onLoginSubmit}>
    </InputForm>
  </div>
  )
}
