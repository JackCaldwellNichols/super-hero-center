import React, {useContext} from 'react'
import './quizmenu.scss'
import { Context } from '../../Context/Context'

const QuizMenu = () => {
    const {gameState, setGameState} = useContext(Context)
    console.log(gameState)
  return (
    <div className='quizMenu'>
      menu
    </div>
  )
}

export default QuizMenu
