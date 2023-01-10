import React from 'react'
import {useForm} from 'react-hook-form'

export const InputMessage = ({onSubmitHandler}) => {
  const {register, handleSubmit, reset} = useForm();
  const onButtonSubmit = (data) =>{
    reset();
    onSubmitHandler(data)
  }
  
  return (
    <form className='flex min-w-full mb-2' action="" onSubmit={handleSubmit(onButtonSubmit)}>
      <input {...register('text')} className='bg-[#EEEEEE] px-2 text-[#222831] grow-[4] min-h-[40px] rounded-md' type="text"/>
      <button className='font-bold grow-[1] ml-2 rounded-md bg-[#00ADB5] hover:bg-[#EEEEEE] hover:text-[#00ADB5]' type='submit'>Send</button>
    </form>
  )
}
