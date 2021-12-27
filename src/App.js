import React from "react";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import DemoPage from "./Components/DemoPage";
import CourseWizard from "./Components/CourseWizard";
import Footer from "./Components/Footer";
import HomePage from "./Components/HomePage";
import Add from "./Components/Add";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/Add" element={<Add />}></Route>
          <Route exact path="/" element={<HomePage />}></Route>
          <Route exact path="/DemoPage" element={<DemoPage />}></Route>
          <Route exact path="/CourseWizard" element={<CourseWizard />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
