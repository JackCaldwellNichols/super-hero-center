import React, {useState, useEffect, Suspense} from 'react'
import './home.scss'
import axios from 'axios'
import MD5 from 'crypto-js/md5'
import Card from '../../components/Card'
import { Link } from 'react-router-dom'
import Pages from '../../components/Pagination/Pagination'







const Home = () => {
  const [heroes, setHeroes] = useState([])
  const [searchText, setSearchText] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [perPageNumber, setPerPageNumber] = useState(20)


    useEffect(() => {
    const fetchHeroes = async () => {

    try {
  
        const res = await axios.get('https://akabab.github.io/superhero-api/api/all.json')
        setHeroes(res.data)

      } catch (error) {
        console.log(error)
      }
    }
    fetchHeroes()
  }, [])

const indexOfLastHero = currentPage * perPageNumber
const indexOfFirstHero = indexOfLastHero - perPageNumber
const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero)

const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <div className='home'>
      <div className="banner">
        <img src='https://res.cloudinary.com/dzcz4e9nd/image/upload/v1683699398/4-removebg-preview_tuqedr.png' className='banner'/>
        <h1 className='centre'>Center</h1>
      </div>
      <div className="wrapper">
        {
          currentHeroes.map((hero) => (
            <Link to={`/hero/${hero.id}`}>
              <Card hero={hero}/>
           </Link>
          ))
        }
      </div>
      <div className="bottom">
        <Pages perPageNumber={perPageNumber} total={heroes.length} paginate={paginate}/>
      </div>
    </div>
  )
}

export default Home
