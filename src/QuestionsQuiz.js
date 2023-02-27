/*
React component to create quizes.
Gets questions from database and create question for the quiz.
Create next question based on next item.
Returns the quiz.
*/

/* Imports */
import React from "react";
import Quiz from "react-quiz-component";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { Container, Row, Col } from "react-grid-system";
import Logo from "./logo_amnon.png";
import Axios from "axios";

const QuestionsQuiz = () => {
  const params = useParams();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [loading, setLoading] = useState(true);
  const [quiz, setQuiz] = useState();

  useEffect(() => {
    getItems();
  }, []);

  /* Get all items and questions
   * Get items and quests from database.
   */
  const getItems = async () => {
    try {
      const response = await Axios.get("http://34.165.154.8:3001/Item");
      const response2 = await Axios.get(
        `http://34.165.154.8:3001/Quest/${params.id}`
      );
      getQuestions(
        response2.data[0].questions,
        response2.data[0].questName,
        response2.data[0].questItems
          ? response2.data[0].questItems
          : "Neanderthal-אבן יד-",
        response.data
      );
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Create question from questions list.
   * create items questions from list.
   * @param {*} course
   * @param {*} title
   * @param {*} items
   * @param {*} data
   */
  const getQuestions = async (course, title, items, data) => {
    try {
      let arr = [];
      arr = course.split("-");
      let showCasesIds = [];
      let images = [];
      let itemsArrTemp = [];
      itemsArrTemp = items.split("%^%");
      itemsArrTemp.forEach((item) => {
        let itemId = item.split("@#@")[1].trim();
        let showId = data.filter((item) => item.ItemID === itemId)[0]
          ?.ShowcaseID;
        showCasesIds.push(showId ? showId : "5");
        images.push(
          data.filter((item) => item.ItemID === itemId)[0]?.ImagePath
        );
      });
      let questionslist = [];
      let counter = 1;
      for (const element of arr) {
        const response = await Axios.get(
          `http://34.165.154.8:3001/question/${element}`
        );
        questionslist.push(
          buildQuestion(response.data[0], images[counter - 1])
        );
        if (counter !== showCasesIds.length) {
          questionslist.push(
            buildNextItem(showCasesIds[counter], response.data[0].Clue)
          );
        }
        counter++;
      }
      let quiz = {
        quizTitle: title,
        quizSynopsis: "", // Change to the relevant one
        questions: questionslist,
        appLocale: {
          question: "שאלה",
          startQuizBtn: "התחל מסלול",
          resultFilterAll: "הכול",
          resultFilterCorrect: "נכון",
          resultFilterIncorrect: "לא נכון",
          prevQuestionBtn: "Prev",
          nextQuestionBtn: "הבא",
          resultPageHeaderText: `השלמת את המסלול! \n ענית נכון על <correctIndexLength>/<questionLength>`,
          singleSelectionTagText: "",
          pickNumberOfSelection: "",
          landingHeaderText: `מסלול זה מכיל <questionLength> שאלות`,
          resultPagePoint: "סך הנקודות שלך הוא <correctPoints>/<totalPoints>",
        },
      };
      setQuiz(quiz);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Build questions body, hint and correct answer.
   * @param {*} data
   * @param {*} image
   * @returns
   */
  const buildQuestion = (data, image) => {
    let temp = {
      question: "abd",
      questionType: "text",
      answerSelectionType: "single",
      answers: ["", "", "", ""],
      correctAnswer: "3",
      questionPic: image ? image : Logo,
      messageForCorrectAnswer: `תשובה נכונה כל הכבוד!\n הרמז לפריט הבא הוא:`,
      messageForIncorrectAnswer: `תשובה לא נכונה, נסו שוב`,
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

  const buildNextItem = (item, clue) => {
    let ShowcaseID = item;

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
      messageForCorrectAnswer: `תשובה נכונה כל הכבוד!`,
      messageForIncorrectAnswer: `תשובה לא נכונה, נסו שוב!`,
      point: "20",
    };
    temp.question = ` \nבהתבסס על הרמז \n${clue}הויטרינה של הפריט הבא היא: `;
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

  const nextButtonText = "שאלה הבאה"; // set the text for the next button

  /**
   * Component's front side
   */
  return (
    <>
      <div className="quizComp">
        <Container>
          {loading ? (
            <Row>
              <div style={{ position: "center" }} className="spinner-container">
                <div className="loading-spinner"> Loading...</div>
              </div>
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
                    nextQuestionBtn={nextButtonText} // pass the next button text as a prop
                  />
                </Row>
              </div>
              <Row>
                <div style={{ marginTop: "50px", textAlign: "center" }}>
                  {token === "abc" ? (
                    <QRCode value={`${window.location.href}`} size="150" />
                  ) : (
                    ""
                  )}
                </div>
              </Row>
            </>
          )}
        </Container>
      </div>
    </>
  );
};

export default QuestionsQuiz;
