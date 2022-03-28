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
    formData.append("myImage", this.state.file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    axios
      .post("http://34.65.174.141:3001/upload", formData, config)
      .then((response) => {
        this.setState({ path: response.data });
        this.props.parentCallback(this.state.path);
        alert("File uploaded successfully!");
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <div style={{ margin: "2%" }}>
        <form onSubmit={this.onFormSubmit}>
          <h6>Upload Image</h6>

          <input
            accept="image/png, image/gif, image/jpeg"
            type="file"
            name="myImage"
            onChange={this.onChange}
          />

          <Button
            type="submit"
            style={{
              color: "white",
              background: "#3b89d9",
              marginLeft: "-90px",
            }}
          >
            Upload
          </Button>
        </form>
      </div>
    );
  }
}

export default ReactUploadImage;
