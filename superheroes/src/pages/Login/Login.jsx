import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'
import './login.scss'
import { Context } from '../../Context/Context'

const Login = () => {

  const {dispatch, isFetching} = useContext(Context)
  const [error, setError] = useState(false)
  const passwordRef = useRef()
  const emailRef = useRef()
  const nav = useNavigate('')


  const handleSubmit = async (e) => {
    e.preventDefault()
    dispatch({type: "LOGIN_START"})
      try {
        const res = await axios.post(import.meta.env.VITE_SERVER_URL + '/api/auth/login', {
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
        dispatch({type: "LOGIN_SUCCESS", payload: res.data})
        nav('/')
      } catch (error) {
        console.log(error)
        alert(error.response.data)
      }
  }

  return (
    <div className='login'>
      <div className="banner">
        <img src='https://res.cloudinary.com/dzcz4e9nd/image/upload/v1683699398/4-removebg-preview_tuqedr.png' className='banner'/>
        <h1 className='centre'>Center</h1>
      </div>
      <form className="wrapper" onSubmit={handleSubmit}>
        <h1>Login</h1>
        <input placeholder='Email' className='email' type='text' ref={emailRef} required/>
        <input placeholder='Password' className='password' type='password' ref={passwordRef} required/>
        <button type='submit' className='loginBtn'>LOGIN</button>
       
            <span className='signUpWrapper'>Don't have an account?    
                <Link to='/register' className='link'> Sign Up here.</Link>
            </span>
      </form>
    </div>
  )
}

export default Login
