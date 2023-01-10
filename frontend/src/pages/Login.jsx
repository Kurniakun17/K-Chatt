import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const InputForm = () => {
  
} 

export const Login = () => {
  const {register, handleSubmit} = useForm();
  const navigate = useNavigate();
  const onHandleSubmit = data => {
    axios.post('http://localhost:3000/auth',{
      username: data.username,
      password: data.password
    }).then(res => res.data)
    .then(data=>{
      if(data.status){
        navigate('/home')
      }else{
        toast.error("Incorrect username or password!",{
          position: "bottom-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      }
    }).catch(err => console.log(err.message))
  }

  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-25px] ml-[-25px] w-[440px] border border-slate-300 rounded-xl text-[#222831] bg-white text-lg'>
      <div className='m-auto my-16 mx-14 max-w-[75%]'>
        <h1 className='text-3xl text-[#00ADB5] font-bold text-center mb-2'>Login</h1>
        <form className='flex flex-col gap-2' onSubmit={handleSubmit(onHandleSubmit)}>
          <div>
            <label className='block font-medium' htmlFor="username">Username</label>
            <input className='mt-1 px-3 py-2 rounded-md border border-slate-700 min-w-full text-md' minLength="4" id='username' type="text" {...register("username")}/>
          </div>
          <div>
            <label className='block font-medium' htmlFor="password">Password</label>
            <input className='mt-1 px-3 py-2 rounded-md border border-slate-700 min-w-full text-md' minLength="8" id="password" type="password" {...register("password")}/>
          </div>
          <button className='py-2 px-2 mt-3 text-md font-medium border border-slate-700 rounded-md hover:text-white hover:bg-[#222831]' type='submit'>Submit</button>
        </form>
        <p className='text-sm mt-3 text-center'>Didn't have an account? <Link to={'/register'} className='text-[#00ADB5]'>Register</Link></p>
      </div>
    </div>
  )
}
