import React from 'react'
import './card.scss'

const Card = ({hero}) => {
   return(
    <div className='card'>
        <img src={hero.images.md}alt={hero.name}/>
        <h4 className='heroName'>{hero.name}</h4>
    </div>


   )
}

export default Card
