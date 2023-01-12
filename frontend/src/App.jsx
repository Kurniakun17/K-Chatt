import { useState } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate();

  return (
    <div className="relative bg-[#222831] text-white min-h-screen box-border">
      <Routes>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
        <Route exact path='*' element={<Login></Login>}></Route>
      </Routes>
      <ToastContainer/>
    </div>
  )
}

export default App
