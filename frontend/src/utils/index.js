import axios from 'axios'

export const verifyToken = async (cookies, removeCookies, navigate) => {
  console.log("verify token triggered")
  if(cookies.jwt){
    const res = await axios.post('http://localhost:3000/auth/validatetoken', {}, {withCredentials:true})
    if(res.data.status){
      return res.data.username
    }
    removeCookies('jwt')
  }
  return navigate('/login')
}