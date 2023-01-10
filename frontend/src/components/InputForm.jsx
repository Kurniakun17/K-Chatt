import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export const InputForm = ({FormArr, title}) => {
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
  console.log(FormArr)

  const CreateInput = ({name, type}, index) => {
    return(
      <div key={index}>
        <label className='block font-medium' htmlFor={name}>{name}</label>
        <input className='mt-1 px-3 py-2 rounded-md border border-slate-700 min-w-full text-md' minLength="4" id={name} type={type} {...register(name)}/>
      </div>
    )
  } 

  return(
    <div className='m-auto my-16 mx-14 max-w-[75%]'>
      <form className='flex flex-col gap-2' action="">
        <h1 className='text-3xl text-[#00ADB5] font-bold text-center mb-2'>{title}</h1>
        {FormArr.map((data, index)=>CreateInput(data, index))}
        <button className='py-2 px-2 mt-3 text-md font-medium border border-slate-700 rounded-md hover:text-white hover:bg-[#222831]' type='submit'>Submit</button>
      </form>
      {this.children}
    </div>
  )
}
