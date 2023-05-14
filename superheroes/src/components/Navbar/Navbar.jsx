import React, { useContext } from 'react'
import './nav.scss'
import { Link, useNavigate} from 'react-router-dom'
import { Context } from '../../Context/Context'


const Navbar = () => {

const {user, dispatch} = useContext(Context)
const nav = useNavigate()
const handleLogout = () => {
  dispatch({type: "LOGOUT"})
  nav('/home')

}

  return (
    <div className='navbar'>
      <div className="left">
        <Link to='/home' className='link'>
            <img className='logo' src='https://res.cloudinary.com/dzcz4e9nd/image/upload/v1683716426/Disen%CC%83o_sin_ti%CC%81tulo-removebg-preview_iiuusi.png'/>
        </Link>
      </div>
      <div className="right">
        {user ? (
                 <Link to={`/profile/${user._id}`}>
                 <img src={`https://robohash.org/${user._id}?set=set2&size=180x180`} className='profilePic'/>
               </Link>
        ) : (
          null
        )}
        <Link to='/search' className='link'>
          <span>Search</span>
        </Link>
        {user ? (
        <Link to='/quiz' className='link'>
          <span>Quiz</span>
        </Link>
          ) : (
            null
          )}
        {user ? (
              <span onClick = {handleLogout} className='link'>Logout</span>
        ) : (
          <Link to='/login' className='link'>
              <span>Login</span>
          </Link>
        )}

      </div>
    </div>
  )
}

export default Navbar
