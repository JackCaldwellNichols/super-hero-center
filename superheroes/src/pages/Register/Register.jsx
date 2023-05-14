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
        const res = await axios.post('http://localhost:8000/api/auth/register', {
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
      <form className="wrapper" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <input placeholder='First Name' className='name' type='text' ref={FirstNameRef} required/>
        <input placeholder='Last Name' className='name' type='text' ref={LastNameRef} required/>
        <input placeholder='Email' className='email' type='email' ref={emailRef} required/>
        <input placeholder='Password' className='password' type='password' ref={passwordRef} required minLength={6}/>
        <input placeholder='Repeat Password' className='password' type='password' ref={passwordCheckRef} required />

        <button type='submit' className='regBtn'>Sign Up</button>
   
            <span>Already have an account?    
                <Link to='/login'>Log in here.</Link>
            </span>
        
      </form>
      
    </div>
  )
}

export default Register
