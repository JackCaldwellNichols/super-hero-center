import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import { Context } from '../../Context/Context'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './hero.scss'

const Hero = () => {
const {user, dispatch} = useContext(Context)
const location = useLocation()
const path = location.pathname.split('/')[2]
const [hero, setHero] = useState([])
const [favId, setFavId] = useState([])


const toastifySuccess = () => {
  toast("Added to your favourites!", {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    backgroundColor: "lime",
    pauseOnHover: true,
    draggable: false,
    className: 'submit-feedback success',
    toastId: 'notifyToast'
  })
}

const toastifyRemove = () => {
  toast("Removed from your favourites!", {
    position: 'bottom-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    backgroundColor: "lime",
    pauseOnHover: true,
    draggable: false,
    className: 'submit-feedback success',
    toastId: 'notifyToast'
  })
}




useEffect (() => {
  const fetchHero = async () => {
 
      const res = await axios.get(`https://akabab.github.io/superhero-api/api/id/${path}.json`)
      setHero(res.data)
  }
fetchHero()
  }, [path])


  useEffect(() => {
    const fetchFav = async () => {
      const res = await axios.get(`http://localhost:8000/api/user/${user._id}`)
      setFavId(res.data._doc.favourites)
    }
    fetchFav()
  }, [])




  const handleAdd = async () => {
    try {
      await axios.put(`http://localhost:8000/api/user/${path}/add`, {
        userId: user._id
      })
      toastifySuccess()
      setTimeout(() => {
        window.location.reload()
    }, 2500)
    clearTimeout()
    } catch (error) {
      console.log(error)
    }
  }


  const handleRemove = async () => {
    try {
      await axios.put(`http://localhost:8000/api/user/${path}/unfavourite`, {
        userId: user._id
      })
      dispatch({type: 'REMOVE:FAV', payload: user._id})
      toastifyRemove()
      setTimeout(() => {
        window.location.reload()
    }, 2500)
    clearTimeout()
    } catch (error) {
      console.log(error)
    }
  }




  return (
    
    <div className='hero'>
      <div className="banner">
        <h2 className='heroName'>{hero ? hero.name : ""}</h2>
        <img src={hero.images ? hero.images.md : "oops"} className='heroProfilePic'/>
      </div>
        <div className="middle">
          <div className="left">
          <h4>Gender: {hero.appearance ? hero.appearance.gender : ''}</h4>
            <h4> Race: {hero.appearance ? hero.appearance.race : ''}</h4>
            <h4>Full Name: {hero.biography ? hero.biography.fullName : ''}</h4>
            <h4>Place of Birth: {hero.biography ? hero.biography.placeOfBirth : 'Unknown'}</h4>
            <h4>Publisher: {hero.biography ? hero.biography.publisher : ''}</h4>
            <h4>Alignment: {hero.biography ? hero.biography.alignment : ''}</h4>
          </div>
           <div className="right">
           <h4>Occupation: {hero.work ? hero.work.occupation : ''}</h4>
            <h4>Comabt: {hero.powerstats ? hero.powerstats.combat : ''}</h4>
            <h4>Intelligence: {hero.powerstats ? hero.powerstats.intelligence : ''}</h4>
            <h4>Speed: {hero.powerstats ? hero.powerstats.speed : ''}</h4>
            <h4>Power: {hero.powerstats ? hero.powerstats.power : ''}</h4>
            <h4>Strength: {hero.powerstats ? hero.powerstats.strength : ''}</h4>
           </div>
           </div>
           <div className="heroBtnWrapper">
           <Link to='/home'>
              <button>Back Home</button>
            </Link>
  
            {!user ? null : user && favId.includes(String(path)) ? (
              <button onClick={handleRemove}>Remove from favourites</button>
            ) : (
              <button onClick={handleAdd}>Add to favourites</button>
            )}
           </div>
      <ToastContainer />
    </div>
    
  )
}

export default Hero
