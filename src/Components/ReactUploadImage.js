/**
 * React image upload component
 * formatting the picture into data and sending to database.
 */

import React from "react";
import { Button } from "react-bootstrap";

const axios = require("axios");

class ReactUploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
      path: null,
    };
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    console.log(formData);
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://34.165.154.8:3001/upload", formData, config)
      .then((response) => {
        this.setState({ path: response.data });
        this.props.parentCallback(this.state.path);
        alert("File uploaded successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div style={{ margin: "2%" }}>
        <h6 style={{ color: "black" }}> Upload Image </h6>
        <input
          accept="image/png, image/gif, image/jpeg"
          type="file"
          name="myImage"
          onChange={this.onChange}
        />
        <Button
          onClick={this.onFormSubmit}
          type="button"
          style={{
            color: "black",
            background: "#3b89d9",
            marginLeft: "-90px",
          }}
        >
          Upload{" "}
        </Button>{" "}
      </div>
    );
  }
}

export default ReactUploadImage;
