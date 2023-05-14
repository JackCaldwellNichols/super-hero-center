import React from 'react'
import './enter.scss'


const Enter = () => {
  return (
    <div className='enter'>
      <video  autoPlay muted >
        <source src='https://res.cloudinary.com/dzcz4e9nd/video/upload/v1683363789/Marvel_Comics_Intro.mp4_pqndma.mp4' />
        <button className='enterButton'>Enter Site</button>
      </video>

    </div>
  )
}

export default Enter
