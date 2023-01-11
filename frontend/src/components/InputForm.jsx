import React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';



export const InputForm = ({FormArr, title, phrase, onSubmit}) => {
  const {register, handleSubmit} = useForm();

  const CreateInput = ({name, type, minLength}, index) => {
    return(
      <div key={index}>
        <label className='block font-medium' htmlFor={name}>{name}</label>
        <input className='mt-1 px-3 py-2 rounded-md border border-slate-700 min-w-full text-md' minLength={minLength} id={name} type={type} {...register(name)}/>
      </div>
    )
  } 

  return(
    <div className='m-auto mt-14 mb-8 mx-14 max-w-[75%]'>
      <form className='flex flex-col gap-2'onSubmit={handleSubmit(onSubmit)}>
        <h1 className='text-4xl text-[#00ADB5] font-bold text-center mb-4'>{title}</h1>
        {FormArr.map((data, index)=>CreateInput(data, index))}
        <button className='py-2 px-2 mt-3 text-md font-medium border border-slate-700 rounded-md hover:text-white hover:bg-[#00ADB5] hover:ease-in' type='submit'>Submit</button>
      </form>
      {phrase}
    </div>
  )
}
