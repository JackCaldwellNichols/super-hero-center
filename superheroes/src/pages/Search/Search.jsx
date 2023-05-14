import React, { useState, useEffect, useContext } from 'react'
import Card from '../../components/Card'
import './search.scss'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'


const Search = () => {
const {user} = useContext(Context)

const [text, setText] = useState('')
const [heroes, setHeroes] = useState([])

useEffect(() => {
    const fetchHeroes = async () => {

    try {  
        const res = await axios.get('https://akabab.github.io/superhero-api/api/all.json', )
        setHeroes(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchHeroes()
  }, [text])



  return (
    <div className='search'>
       
      <div className="wrapper">
        <div className="top">
            <h1>Whom do you seek?</h1>
            <input placeholder='Search...' onChange={(e) => setText(e.target.value)}/>
        </div>
        <div className="bottom">
            {heroes.filter((hero) => {
                if(text === ''){
                    return null
                }else if(hero.name.toLowerCase().includes(text.toLowerCase())){
                    return hero
                }
            })
            .map((hero) => (
                <Link to={`/hero/${hero.id}`}>
                  <Card hero={hero}/>
                </Link>
            ))
            }
        </div>
      </div>
    </div>
  )
}

export default Search
