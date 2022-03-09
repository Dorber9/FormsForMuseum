import React from "react";
import AAA from '../uploads/IMAGE-1646843561991.jpg';

const axios = require("axios");


class ReactUploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null,
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
        alert("The file is successfully uploaded");
        console.log(response);
      })
      .catch((error) => {});
  }
  onChange(e) {
    this.setState({ file: e.target.files[0] });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <h1>File Upload</h1>
        <img src={require('../uploads/IMAGE-1646843561991.jpg')}></img>
        
        
        
        <input type="file" name="myImage" onChange={this.onChange} />
        <button type="submit">Upload</button>
      </form>
    );
  }
}

export default ReactUploadImage;
