import React from "react";
import Quiz from "react-quiz-component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Container, Row, Col } from "react-grid-system";

import Axios from "axios";

/* eslint-disable */

const QuestionsQuiz = () => {
  const params = useParams();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState();
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getItems();
    Axios.get(`http://34.165.154.8:3001/Quest/${params.id}`).then(
      (response) => {
        getQuestions(
          response.data[0].questions,
          response.data[0].questName,
          response.data[0].questItems
            ? response.data[0].questItems
            : "Neanderthal-אבן יד-"
        );

        setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    );
  }, []);

  const getItems = () => {
    Axios.get("http://34.165.154.8:3001/Item").then((response) => {
      setItemsList(response.data);
      Axios.get(`http://34.165.154.8:3001/Quest/${params.id}`).then(
        (response) => {
          getQuestions(
            response.data[0].questions,
            response.data[0].questName,
            response.data[0].questItems
              ? response.data[0].questItems
              : "Neanderthal-אבן יד-"
          );

          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      );
    });
  };

  const getQuestions = (course, title, items) => {
    let arr = [];
    arr = course.split("-");
    console.log(arr);
    let showCasesIds = [];
    let itemsArrTemp = [];
    itemsArrTemp = items.split("%^%");
    itemsArrTemp.forEach((item) => {
      let itemId = item.split("@#@")[1].trim();
      let showId = itemsList.filter((item) => item.ItemID === itemId)[0]
        ?.ShowcaseID;
      showCasesIds.push(showId ? showId : "5");
    });
    let questionslist = [];
    let counter = 0;

    arr.forEach((element) => {
      console.log(element);
      Axios.get(`http://34.165.154.8:3001/question/${element}`).then(
        (response) => {
          questionslist.push(buildQuestion(response.data[0]));
          counter != showCasesIds.length - 1
            ? questionslist.push(buildNextItem(showCasesIds[counter]))
            : "";
          counter++;
        }
      );
    });
    let quiz = {
      quizTitle: title, // Change to the relevant one
      quizSynopsis: "", // Change to the relevant one
      questions: questionslist,
    };
    setQuiz(quiz);
  };

  const buildQuestion = (data) => {
    let temp = {
      question: "abd",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "3",
      messageForCorrectAnswer: `Correct answer. Good job. The hint for your next item is ${data.Clue}`,
      messageForIncorrectAnswer: `Incorrect answer. The hint for your next item is ${data.Clue}`,
      explanation: data.Clue,
      point: "20",
    };
    temp.question = data.Question;
    temp.correctAnswer = data.Correct;
    let answers = [];
    answers.push(data.a1);
    answers.push(data.a2);
    answers.push(data.a3);
    answers.push(data.a4);
    temp.answers = answers;
    return temp;
  };

  const buildNextItem = (item) => {
    let ShowcaseID = item;
    // Axios.get(`http://34.165.154.8:3001/ItemShowcase/${item}`).then(
    //   (response) => {
    //     console.log(response.data[0].ShowcaseID);
    //     ShowcaseID = response.data[0].ShowcaseID;
    //   }
    // );

    let numberTwo = 0;
    let numberThree = 0;
    let numberFour = 0;

    do {
      numberTwo = Math.floor(Math.random() * 20);
    } while (numberTwo === ShowcaseID);
    do {
      numberThree = Math.floor(Math.random() * 20);
    } while (numberTwo === numberThree || numberThree === ShowcaseID);
    do {
      numberFour = Math.floor(Math.random() * 20);
    } while (
      numberTwo === numberFour ||
      numberThree === numberFour ||
      numberFour === ShowcaseID
    );

    let temp = {
      question: "abd",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "3",
      messageForCorrectAnswer: `Correct answer. Good job. The hint for your next item is`,
      messageForIncorrectAnswer: `Incorrect answer. The hint for your next item is`,
      explanation: "dwdw",
      point: "20",
    };
    temp.question = "הפריט הבא הוא";
    let answers = [];
    answers.push(numberTwo);
    answers.push(numberThree);
    answers.push(ShowcaseID);
    answers.push(numberFour);
    temp.answers = answers.sort(() => Math.random() - 0.5);
    let curr = 1;
    answers.forEach((e, i) => {
      if (e == item) {
        curr = i + 1;
      }
    });

    temp.correctAnswer = curr.toString();
    return temp;
  };

  return (
    <>
      <Container>
        {loading ? (
          <Row>
            <Col>
              <div style={{ position: "center" }} className="spinner-container">
                <div className="loading-spinner"> Loading...</div>
              </div>
            </Col>
          </Row>
        ) : (
          <>
            <div className="quiz">
              <Row>
                <Quiz
                  quiz={quiz}
                  continueTillCorrect={true}
                  showInstantFeedback={true}
                  shuffle={false}
                />
              </Row>
            </div>
            <Row>
              <Col>
                <div style={{ marginTop: "50px", textAlign: "center" }}>
                  {token === "abc" ? (
                    <QRCode value={`${window.location.href}`} size="150" />
                  ) : (
                    ""
                  )}
                </div>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </>
  );
};

export default QuestionsQuiz;
