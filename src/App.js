import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import CourseWizard from "./Components/CourseWizard";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import Add from "./Components/Add";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ModifyData from "./Components/Modify/ModifyData";
import Reports from "./Components/Reports";
import Header from "./Components/Header";
import { Translator } from "react-auto-translate";
import ListOfItems from "./Components/ListOfItems";
import ViewItemNewPage from "./Components/ViewItemNewPage";
import AddQuestionNew from "./AddQuestionNew";
import Login from "./Login";
import useToken from "./useToken";
import QuestionsQuiz from "./QuestionsQuiz";
import SearchItem from "./Components/SearchItem";
import ModifyCourse from "./Components/Modify/ModifyCourse";

function App() {
  // useEffect(() => {
  //   setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);
  // }, []);

  const { token, setToken } = useToken();

  // if (!token) {
  //   return <Login setToken={setToken} />;
  // }

  return (
    <>
      <Translator
        from="en"
        to="he"
        googleApiKey="AIzaSyBp9UbjyBP9K1I4Yh8E9G_T6srKYKD8xR8"
      >
        <div
          className="fontBody"
          style={{
            backgroundColor: "#ebebe0",
            // position: "relative",
            // width: "100%",
            // height: "100%",
          }}
        >
          {token === "abc" ? <Header /> : ""}

          <BrowserRouter>
            <Routes>
              <Route exact path="/Search" element={<SearchItem />}></Route>
              {token === "abc" && (
                <>
                  <Route exact path="/Add" element={<Add />}></Route>
                  <Route exact path="/" element={<HomePage />}></Route>
                  <Route
                    exact
                    path="/AddQuestion/:id"
                    element={<AddQuestionNew></AddQuestionNew>}
                  ></Route>

                  <Route
                    exact
                    path="/CourseWizard"
                    element={<CourseWizard />}
                  ></Route>
                  <Route
                    exact
                    path="/ModifyData"
                    element={<ModifyData />}
                  ></Route>

                  <Route exact path="/Reports" element={<Reports />}></Route>
                </>
              )}
              {token !== "abc" && (
                <>
                  <Route
                    exact
                    path="/Login"
                    element={<Login setToken={setToken} />}
                  ></Route>
                  <Route
                    exact
                    path="/"
                    element={<ListOfItems></ListOfItems>}
                  ></Route>
                </>
              )}
              <Route
                exact
                path="/Course/:id"
                element={<QuestionsQuiz></QuestionsQuiz>}
              ></Route>
              <Route
                exact
                path="/ItemsList"
                element={<ListOfItems></ListOfItems>}
              ></Route>
              <Route
                exact
                path="/Item/:id"
                element={<ViewItemNewPage />}
              ></Route>
            </Routes>
            {token === "abc" && <Footer />}
          </BrowserRouter>
        </div>
      </Translator>
    </>
  );
}

export default App;
