import React from 'react'
import Quiz from 'react-quiz-component';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import Axios from "axios";



const QuestionsQuiz = () => {
    const params = useParams();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    const [loading, setLoading] = useState(true);
    const[quiz, setQuiz] = useState();

    
    useEffect(() => {
    Axios.get(`http://34.65.174.141/Quest/${params.id}`).then((response) => {
    getQuestions(response.data[0].questions,response.data[0].questName);
     setTimeout(() => {
        setLoading(false);
      }, 3000);
    })

  }, []);

    


 const getQuestions = (course,title) => {
    let arr=[]
    arr=course.split("-");
    arr.pop()
    let questionslist=[]
    arr.forEach((element)=> {
        Axios.get(`http://34.65.174.141:3001/question/${element}`).then((response) => {
            buildQuestion(response.data[0])
            questionslist.push(buildQuestion(response.data[0]))
            let quiz =  {
            "quizTitle": title, // Change to the relevant one
            "quizSynopsis": "מסלול לדוגמא", // Change to the relevant one
            questions: questionslist}
            setQuiz(quiz)
        });
    
    })
   
  };

  const buildQuestion=(data)=>{
            let temp= {
            question: "abd",
      questionType: "text",
      answerSelectionType: "single",
      answers: [
        "",
        "",
        "",
        ""
      ],
      correctAnswer: "3",
      messageForCorrectAnswer: "Correct answer. Good job.",
      messageForIncorrectAnswer: "Incorrect answer. Please try again.",
      explanation: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      point: "20"
    }
        temp.question=data.Question;
        temp.correctAnswer=data.Correct;
        let answers=[]
        answers.push(data.a1)
        answers.push(data.a2)
        answers.push(data.a3)
        answers.push(data.a4)
        temp.answers=answers;
        return temp;
  }

  return (
      <>
    { loading ?  <div style={{ position: "center" }} className="spinner-container">
          <div className="loading-spinner"> Loading...</div>
          
        </div> : (
            <>
    <div className="pshDwn"><Quiz style={{ position: "center"}} quiz={quiz}/>
       <div style={{ marginTop: "50px", textAlign: "center" }}>
            {token === "abc" ? (
              <QRCode value={`${window.location.href}`} size="150" />
            ) : (
              ""
            )}
          </div>
          </div>
          </>
    ) }
   
    </>
  )
}

export default QuestionsQuiz
