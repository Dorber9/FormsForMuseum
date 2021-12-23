import React from "react";
import "./App.css";
import AddForm from "./AddForm";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import GameForm from "./GameForm";
import DemoPage from "./DemoPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/AddForm" element={<AddForm />}></Route>
          <Route exact path="/" element={<GameForm />}></Route>
          <Route exact path="/DemoPage" element={<DemoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
