import React from "react";
import "../App.css";
import ReactUploadImage from "./ReactUploadImage.js";
const HomePage = () => {
  return (
    <div>
      <div>
        <h1 style={{ textAlign: "center" }}>Welcome To Museum</h1>
        {/* <ReactUploadImage /> */}
        <div style={{ textAlign: "center" }}>
          <img
            alt="fautly"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/Tel_Hai_128.jpg/2560px-Tel_Hai_128.jpg"
            style={{ width: "1000px", height: "652px", textAlign: "center" }}
          ></img>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
