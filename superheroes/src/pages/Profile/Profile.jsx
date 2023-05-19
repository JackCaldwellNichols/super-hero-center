import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Context } from '../../Context/Context'
import axios from 'axios'
import './profile.scss'
import {local} from '../../../data.js'

const Profile = () => {
  const {user} = useContext(Context)
  const [favourites, setFavourites] = useState([])
  const [goodCount, setGoodCount] = useState(0)
  const [badCount, setBadCount] = useState(0)
  const path = useLocation()
  const userId = path.pathname.split('/')[2]
  const empty = []
  const emptyId = []

  useEffect(() => {
    const fetchFav = async () => {
      const res = await axios.get(`https://herocenter.onrender.com/api/user/${userId}`)
      setFavourites(res.data._doc.favourites)
    }
    fetchFav()
  }, [])

  const check = () => {
    favourites.map((ele) => {
      empty.push(ele)
    })
  }
  check()

  const id = () => {
    empty.map((item) =>{
      local.map((ele, i) => {
        if(String(ele.id)===item){
          emptyId.push(ele)
        }
      })
    })
}
id()

useEffect(() => {
const aligner = () => {
  let countGood = 0
  let countBad = 0
  emptyId.map((ele) => {
    if(ele.biography.alignment === 'good'){
      setGoodCount(countGood += 1)
    }else{
      setBadCount (countBad += 1)
    }
  })
}
aligner()
}, [favourites])


  return (
   
    <div className='profile'>
      <div className="top">
        <h1 className='profileName'>Hey, {user.name}!</h1>
        <img src={`https://robohash.org/${user._id}?set=set2&size=300x300`}  className='ProfilePic'/>
        <h3>Here are your superhero details - update as you wish! {goodCount === badCount ? "Are you a goodie or a baddie? Add to your favourites and we'll find out..." : ( goodCount > badCount ? "Based on your favourites, it seems you are a goodie! Woohoo! Will you save us all?" :  "Based on your favourites, it seems you are a baddie! Oh no! Are you an evil genius?")}</h3>
        </div>
      <div className="middle">
        <div className="left">
          <h4>Gender: {user.gender ? user.gender : "unknown"}</h4>
          <h4>Full Name: {user.name}  {user.lastName}</h4>
          <h4>Place of Birth: {user.pob ? user.pob : "unknown"}</h4>
        </div>
        <div className="right">
          <h4>Alignment: {goodCount === badCount ? "Unknown" : (goodCount > badCount ? "Good" : "Bad")}</h4>
          <h4>Occupation: {user.occupation ? user.occupation : "unknown"}</h4>
          <h4>Intelligence: {user.intelligence ? user.intelligence : "unknown"}</h4>
        </div>
      </div>
    <div className="favourites">
      <h2>Your favourites</h2>
      {favourites.length === 0 ? (
        <h4 style={{color: 'white', textAlign: 'center'}}>Your favourites will appear here</h4>
      ): (
        null
      )}
        <div className="favWrapper">
          {emptyId.map((ele) => (
            <Link className='link' to={`/hero/${ele.id}`}>
              <img src={ele.images.sm} />
            </Link>
          ))}
        </div>
    </div>
    <div className="buttonContainer">
        <Link to='/'>
          <button className='btnProfile'>Back Home</button>
        </Link>
        <Link to={`/edit/${user._id}`}>
          <button className='btnProfile'>Edit Profile</button>
        </Link>
      </div>
  </div>

  )
}

export default Profile
