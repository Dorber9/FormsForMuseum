import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <ul>
      <li>
        <Link to="/Add">Add</Link>
      </li>
      <li>
        <Link to="/DemoPage">Demo Page</Link>
      </li>
      <li>
        <Link to="/CourseWizard">Course Wizard</Link>
      </li>
      <li>
        <Link to="/">Home Page</Link>
      </li>
    </ul>
  );
};

export default Footer;
