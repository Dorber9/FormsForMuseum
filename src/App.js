import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DemoPage from "./Components/DemoPage";
import CourseWizard from "./Components/CourseWizard";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import Add from "./Components/Add";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import ModifyData from "./Components/Modify/ModifyData";
import Reports from "./Components/Reports";
import Header from "./Components/Header";
import {Translator} from 'react-auto-translate';
import ListOfItems from "./Components/ListOfItems";
import ViewItemNewPage from "./Components/ViewItemNewPage";



function App() {
  return (
    <>
     <Translator
      from='en'
      to='he'
      googleApiKey='AIzaSyBp9UbjyBP9K1I4Yh8E9G_T6srKYKD8xR8'
    >
      <div
        style={{
          backgroundColor: "#ebebe0",
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <Header />
        
        <BrowserRouter>
          <Routes>
            <Route exact path="/Add" element={<Add />}></Route>
            <Route exact path="/" element={<HomePage />}></Route>
            <Route exact path="/DemoPage" element={<DemoPage />}></Route>
            <Route exact path="/ItemsList" element={<ListOfItems></ListOfItems>}></Route>
            <Route exact path="/Item/:id"  element={<ViewItemNewPage/>}></Route>
            <Route
              exact
              path="/CourseWizard"
              element={<CourseWizard />}
            ></Route>
            <Route exact path="/ModifyData" element={<ModifyData />}></Route>
            <Route exact path="/Reports" element={<Reports />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </div>
      </Translator>
    </>
  );
}

export default App;
