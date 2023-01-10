import axios from 'axios'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { InputForm } from '../components/InputForm'

export const Register = () => {
  const navigate = useNavigate();
  const FormArr = [
    {
      name: "Username",
      type: "text",
      minLength: 4
    },
    {
      name: "Email",
      type: "text",
      minLength: 10
    },
    {
      name: "Password",
      type: "password",
      minLength: 6
    },
  ]
  const LoginPhrase = (<p className='text-sm mt-3 text-center'>Already have an account? <Link to={'/login'} className='text-[#00ADB5]'>Login</Link></p>);

  const onRegisterSubmit = data => {
    axios.post('http://localhost:3000/auth/register', {
      username: data.Username,
      email: data.Email,
      password: data.Password
    })
    .then(data=>{
      if(data.status){
        // Toastify success!
        navigate('/login')
      }else{
        // Toastify failed!
      }
    })
    console.log(data)
  }

  return (
    <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] mt-[-25px] ml-[-25px] w-[440px] border border-slate-300 rounded-xl text-[#222831] bg-white text-lg'>
      <InputForm FormArr={FormArr} title="Register" phrase={LoginPhrase} onSubmit={onRegisterSubmit}>
      </InputForm>
    </div>
  )
}
