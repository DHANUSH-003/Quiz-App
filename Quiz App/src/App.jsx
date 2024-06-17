import { useEffect, useState } from 'react';
import './App.css'
import questionData from "./question.json";

function App() {
 const [currentQuestion,setCurrentQuestion]=useState(0);
 const [score,setScore]=useState(0);
 const [showScore,setShowScore]=useState(false)
 const [timer,setTimer]=useState(10);

 useEffect(()=>{
   let intervel;
   if(timer>0 && !showScore){
  intervel=setInterval(()=>{
   setTimer((prevTimer)=>prevTimer-1)
  },1000)
   }else{
    clearInterval(intervel)
    setShowScore(true)
   }

   return ()=> clearInterval(intervel);
 }, [timer,showScore])

 const handleAnswerClick=(selectOption)=>{
  if(selectOption===questionData[currentQuestion].answer){
    setScore((prevScore)=>prevScore+1);
  }
  if(currentQuestion< questionData.length-1){
    setCurrentQuestion((preavQuestion)=>preavQuestion+1);
    setTimer(10);
  }else{
    setShowScore(true)
  }

 }

 const resetButton=()=>{
  setCurrentQuestion(0);
  setScore(0);
  setShowScore(0);
  setTimer(10);
 }
  return (
    <>
      <div className='quiz-app'>
        {showScore ? (<div className="score-section">
          <h1>Your score:{score}/{questionData.length}</h1>
          <button onClick={resetButton}>Reset</button>
        </div>) : (<div className="question-section">
          <h2>Question {currentQuestion+1}</h2>
          <p>{questionData[currentQuestion].question}</p>
          <div className="option">
            {questionData[currentQuestion].options.map((options, index)=>(
              <button key={index} onClick={()=>{
                handleAnswerClick(options)
              }}>{options}</button>
            ))}
          </div>
          <div className="timer">
            Time Left:<span>{timer}s</span>
          </div>
        </div>)}
        
      </div>
      
    </>
  )
}

export default App
