import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Register } from './pages/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="relative bg-[#222831] text-white min-h-screen box-border">
      <Routes>
        <Route exact path='/login' element={<Login/>}></Route>
        <Route exact path='/home' element={<Home/>}></Route>
        <Route exact path='/register' element={<Register/>}></Route>
      </Routes>
    </div>
  )
}

export default App
