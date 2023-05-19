import React, {useState, useEffect, useRef, useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './register.scss'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'

const Register = () => {

  const {dispatch, isFetching} = useContext(Context)
  const passwordRef = useRef()
  const passwordCheckRef = useRef()
  const emailRef = useRef()
  const FirstNameRef = useRef()
  const LastNameRef = useRef()
  const nav = useNavigate('')


  const handleSubmit = async (e) => {
    e.preventDefault()

      try {
        const res = await axios.post(import.meta.env.VITE_SERVER_URL +'/api/auth/register', {
          name: FirstNameRef.current.value,
          lastName: LastNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
        res.data && (
          nav('/login')
        )
      } catch (error) {
        console.log(error)
      }
  }

  return (
    <div className='register'>
          <div className="banner">
        <img src='https://res.cloudinary.com/dzcz4e9nd/image/upload/v1683699398/4-removebg-preview_tuqedr.png' className='banner'/>
        <h1 className='centre'>Center</h1>
      </div>
      <form className="wrapper" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input placeholder='First Name' className='name' type='text' ref={FirstNameRef} required/>
        <input placeholder='Last Name' className='name' type='text' ref={LastNameRef} required/>
        <input placeholder='Email' className='email' type='email' ref={emailRef} required/>
        <input placeholder='Password' className='password' type='password' ref={passwordRef} required minLength={6}/>
        <input placeholder='Repeat Password' className='password' type='password' ref={passwordCheckRef} required />

        <button type='submit' className='regBtn'>Sign Up</button>
   
            <span>Already have an account?    
                <Link to='/login' className='link'> Log in here.</Link>
            </span>
        
      </form>
      
    </div>
  )
}

export default Register
