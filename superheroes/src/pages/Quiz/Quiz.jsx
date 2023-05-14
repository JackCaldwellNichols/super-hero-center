import React, {useState, useContext, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './quiz.scss'
import axios from 'axios';
import { Context } from '../../Context/Context';
import { HmacSHA224 } from 'crypto-js';


const Quiz = () => {
  const {user, dispatch} = useContext(Context)
  const userId = user._id
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [q, setQ] = useState([])
  const [score, setScore] = useState(0);
  const nav = useNavigate()
  

useEffect(() => {
  const fetchQuestions = async () => {
    const res = await axios.get('https://opentdb.com/api.php?amount=10&category=29&difficulty=easy&type=multiple')
    setQ(res.data)
  }
  fetchQuestions()
}, [])  

  // Helper Functions

  /* A possible answer was clicked */
  const optionClicked = (correct_answer) => {
    // Increment the score
    if (correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < q.results.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const updateIntel = async () => {
      dispatch({type:'UPDATE_START'})
        const updatedUser = {
            userId: user._id,
            intelligence: score * 10
        };
        try {
          const res = await axios.put(`http://localhost:8000/api/user/${userId}`, updatedUser)
          dispatch({type:'UPDATE_SUCCESS', payload: res.data})
          nav(`/profile/${userId}`)
        } catch (error) {
          console.log(error)
        }
  }




  return (
    <div className="quizMain">
      <div className="titleWrapper">
        <h1>Show us your skills!</h1>
        <h2>Score: {score}</h2>
      </div>
      {showResults ? (

        <div className="final-results">
          <h1>Final Results</h1>
          <h2>
            {score} out of {q.results.length} correct - (
            {(score / q.results.length) * 100}%)
          </h2>
          <h4>{score > 9 ? ("You're a genius! Tell the world by sharing it on your profile!" ) : ( score < 9 && score > 4 ? "You would make for an admirable adversary - share it on your profile!" : "Not bad, but I think Tony Stark would have you for breakfast!") }</h4>
          <button onClick={() => restartGame()} className='quizBtn'>Restart game</button>
          <button onClick={updateIntel} className='quizBtn'>Update your profile!</button>
        </div>
      ) : (
   
        <div className="question-card">
          <h2>
            Question: {currentQuestion + 1} out of {q.results ? q.results.length : "Loading..."}
          </h2>
          <h3 className="question-text">{q.results ? q.results[currentQuestion].question : "Loading"}</h3>
          <ul>
          {q.results ?  (<li onClick={() => optionClicked(q.results[currentQuestion].correct_answer)} className='quizLi'>{q.results[currentQuestion].correct_answer }</li>)
             : ( "Loading" )}
            
            {q.results ? q.results[currentQuestion].incorrect_answers.map((ele) => (
              <li onClick={() => optionClicked(ele.correct_answer)} className='quizLi'>{ele}</li>
            )) : "Loading"}
          </ul>
        </div>
      )}

    </div>
  );

}

export default Quiz
