import { useState } from "react"
import styled from "styled-components"
import { toastError, toastSuccess } from "../utils/toast"
import Button from "../components/Button"


const Container = styled.div`
  display: flex; 
  flex-direction: column; 
  align-items: center; 
  justify-content: center; 
  padding: 40px; 
  background: #fff; 
  border-radius: 15px; 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
  max-width: 500px; 
  margin: 50px auto;
`

const Title = styled.h2`
  color: #333; 
  margin-bottom: 20px; 
  font-size: 24px; 
  text-align: center; 
`

const Question = styled.p`
  color: #555; 
  font-size: 20px; 
  margin-bottom: 20px; 
  text-align: center; 
`
const OptionButton = styled.button`
  padding: 12px 20px; 
  background-color: #007bff;
  color: white; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  font-size: 16px; 
  margin: 10px; 
  transition: background-color 0.3s, transform 0.3s; 

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05); 
  }

  &:active {
    background-color: #004494; 
    transform: scale(0.95); 
  }
`


const Score = styled.p`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: #333; 
  font-size: 20px;
  margin-top: 20px; 
  text-align: center; 
`


const QuizApp = () => {
 
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)

  
  const questions = [
    {
      question: "What is 2+2?", 
      options: ["3", "4", "5", "6"], 
      answer: "4", 
    },
    {
      question: "What is 3+3?", 
      options: ["5", "6", "7", "8"], 
      answer: "6", 
    },
  ]


  const handleAnswer = (answer) => {
   
    if (answer === questions[currentQuestion].answer) {
     
      setScore((score) => score + 1)
      toastSuccess({ text: "Parabéns você acertou!" })
    } else {
      toastError({
        text: `Você errou!, a resposta era ${questions[currentQuestion].answer} `,
      })
    }
  
    setCurrentQuestion((currentQuestion) => currentQuestion + 1)
  }


  const handlePlayAgain = () => {
    setScore(0)
    setCurrentQuestion(0)
  }


  return (
    <Container>
      <Title>Quiz App</Title>
      {currentQuestion < questions.length ? ( 
        <div>
          <Question>{questions[currentQuestion].question}</Question>{" "}
          {questions[currentQuestion].options.map((option) => (
            <OptionButton key={option} onClick={() => handleAnswer(option)}>
              {option}
            </OptionButton>
          ))}
        </div>
      ) : (
        <Score>
          Your score: {score}
          <Button onClick={handlePlayAgain}>Jogar novamente</Button>
        </Score> 
      )}
    </Container>
  )
}


export default QuizApp
