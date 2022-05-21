import React from 'react'
import Quiz from 'react-quiz-component';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";

import Axios from "axios";

/* eslint-disable */


const QuestionsQuiz = () => {
    const params = useParams();
    const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
    const [loading, setLoading] = useState(true);
    const[quiz, setQuiz] = useState();

    
    useEffect(() => {
    Axios.get(`http://34.140.118.51:3001/Quest/${params.id}`).then((response) => {
      if(response.data[0].questItems)
        getQuestions(response.data[0].questions,response.data[0].questName,response.data[0].questItems);
      else
        getQuestions(response.data[0].questions,response.data[0].questName,"Neanderthal-אבן יד-");
    
     setTimeout(() => {
        setLoading(false);
      }, 3000);
    })

  }, []);

    


 const getQuestions = (course,title,items) => {
    let arr=[]
    arr=course.split("-");
    arr.pop()
    let itemsArr=[]
    itemsArr=items.split("-");
    itemsArr.pop()
    let questionslist=[]
    let counter=1
    let i=0
    arr.forEach((element)=> {
        Axios.get(`http://34.140.118.51:3001/question/${element}`).then((response) => {
        if(counter%2==0 || counter==arr.length){
            questionslist.push(buildNextItem(itemsArr[i]))
            i++
        }
        questionslist.push(buildQuestion(response.data[0]))
        counter++
        
        });
            let quiz =  {
            "quizTitle": title, // Change to the relevant one
            "quizSynopsis": "מסלול לדוגמא", // Change to the relevant one
            questions: questionslist}
            setQuiz(quiz)
    
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
      messageForCorrectAnswer: `Correct answer. Good job. The hint for your next item is ${data.Clue}` ,
      messageForIncorrectAnswer: `Incorrect answer. The hint for your next item is ${data.Clue}`,
      explanation: data.Clue,
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


  const buildNextItem=(item)=>{
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
          messageForCorrectAnswer: `Correct answer. Good job. The hint for your next item is` ,
      messageForIncorrectAnswer: `Incorrect answer. The hint for your next item is`,
      explanation: "dwdw", 
      point: "20"
    }
        temp.question="הפריט הבא הוא";
        let answers=[]
        answers.push("פריט רנדומלי")
        answers.push("פריט רנדומלי")
        answers.push(item)
        answers.push("פריט רנדומלי")
        temp.answers=answers;
        return temp;
    };
  

  return (
      <>
    { loading ?  <div style={{ position: "center" }} className="spinner-container">
          <div className="loading-spinner"> Loading...</div>
          
        </div> : (
            <>
    <div className="pshDwn">
        <Quiz style={{ position: "center"}} quiz={quiz} showInstantFeedback={true} />
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
