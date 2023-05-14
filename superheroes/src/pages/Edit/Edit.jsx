import React, { useContext, useRef, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './edit.scss'
import { Context } from '../../Context/Context'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Edit = () => {
    const {user, dispatch} = useContext(Context)

    const path = useLocation()
    const userId = path.pathname.split('/')[2]
    const nav = useNavigate()

    const [name, setName] = useState(user.name)
    const [success, setSuccess] = useState(false)
    const [lastName, setLastName] = useState(user.lastName)
    const [pob, setPob] = useState(user.pob || '')
    const [occupation, setOccupation] = useState(user.occupation || '')
    const [gender, setGender] = useState(user.gender || '')
    const [alignment, setAlignment] = useState(user.alignment || '')

    const updateProfile = async (e) => {
        e.preventDefault()
        dispatch({type:'UPDATE_START'})

        const updatedUser = {
            userId: user._id,
            name,
            lastName,
            pob,
            occupation,
            alignment,
            gender
        };
            try {
                const res = await axios.put(`http://localhost:8000/api/user/${userId}`, updatedUser)
                dispatch({type:'UPDATE_SUCCESS', payload: res.data})
                toastifySuccess()
                setSuccess(true)
                setTimeout(() => {
                    nav(`/profile/${user._id}`)
                }, 6500)
                clearTimeout()
            } catch (error) {
                console.log(error)
                dispatch({type:'UPDATE_FAILURE'})
            }
    }

    const toastifySuccess = () => {
        toast("Account updated!", {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          backgroundColor: "lime",
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback success',
          toastId: 'notifyToast'
        })
      }
    
      const toastifyDelete = () => {
        toast("Account deleted - sad to see you go!", {
          position: 'bottom-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          backgroundColor: "red",
          pauseOnHover: true,
          draggable: false,
          className: 'submit-feedback success',
          toastId: 'notifyToast'
        })
      }

const handleDelete = async () => {
try {
    await axios.delete(`http://localhost:8000/api/user/${userId}`, {
        data: {userId: user._id }
    })
    dispatch({type:'LOGOUT'})
    toastifyDelete()
    setSuccess(true)
    nav('/home')
} catch (error) {
    console.log(error)
}
}

  
  return (
    <div className='edit'>
        <form className="wrapper" onSubmit={updateProfile}>
            <div className="top">
                <img src={`https://robohash.org/${user._id}?set=set2&size=300x300`}  className='ProfilePic'/>
            </div>
            <div className="bottom">
                <div className="left">
                    <label>First Name:</label>
                    <input type="text" placeholder={user.name}  value={name} onChange={(e)=> setName(e.target.value)}/>   
                    <label>Last Name:</label>
                    <input type="text" placeholder={user.lastName} value={lastName}  onChange={(e)=> setLastName(e.target.value)}/>   
                    <label>Where are you from:</label>
                    <input type="text" placeholder='Place of Birth' value={pob} onChange={(e)=> setPob(e.target.value)}/>
                </div>
                <div className="right">
                    <label>Occupation:</label>
                    <input type="text" placeholder='Occupation' value={occupation} onChange={(e)=> setOccupation(e.target.value)}/>
                    <label>Gender:</label>
                    <input type="text" placeholder='Gender' value={gender} onChange={(e)=> setGender(e.target.value)}/>

                </div>
                
            </div>
            <div className="buttonContainer">
                <button type='submit'>Apply Changes</button>
                <button onClick={handleDelete}>Delete Account</button>
            </div>
        </form>
        <ToastContainer />
    </div>
  )
}

export default Edit
