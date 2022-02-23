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

function App() {
    return ( <
        >
        <
        div style = {
            { backgroundColor: "#ebebe0" } } >
        <
        Header / >

        <
        BrowserRouter >
        <
        Routes >
        <
        Route exact path = "/Add"
        element = { < Add / > } > < /Route> <
        Route exact path = "/"
        element = { < HomePage / > } > < /Route> <
        Route exact path = "/DemoPage"
        element = { < DemoPage / > } > < /Route> <
        Route exact path = "/CourseWizard"
        element = { < CourseWizard / > } >
        < /Route> <
        Route exact path = "/ModifyData"
        element = { < ModifyData / > } > < /Route> <
        Route exact path = "/Reports"
        element = { < Reports / > } > < /Route> <
        /Routes> <
        Footer / >
        <
        /BrowserRouter> <
        /div> <
        />
    );
}

export default App;