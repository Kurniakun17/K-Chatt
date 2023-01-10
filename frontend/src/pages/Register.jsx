import React from 'react'
import { Link } from 'react-router-dom'
import { InputForm } from '../components/InputForm'

export const Register = () => {
  const FormArr = [
    {
      name: "username",
      type: "text"
    },
    {
      name: "email",
      type: "text"
    },
    {
      name: "password",
      type: "password"
    },
  ]
  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-25px] ml-[-25px] w-[440px] border border-slate-300 rounded-xl text-[#222831] bg-white text-lg'>
      <InputForm FormArr={FormArr} title="Register">
        <p className='text-sm mt-3 text-center'>Didn't have an account? <Link to={'/register'} className='text-[#00ADB5]'>Register</Link></p>
      </InputForm>
    </div>
  )
}
