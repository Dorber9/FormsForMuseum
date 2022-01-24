import { useState, useEffect } from "react";
import axios from "axios";

const UploadImage = () => {
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const saveFile = (e) => {
    console.log("hara");
    console.log(e.target);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    formData.append("fileName", e.target.files[0].name);

    try {
      const res = await axios.post("http://localhost:3001/upload", {
        formData: formData,
      });
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <div className="App">
      <input type="file" onChange={saveFile} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  );
};

export default UploadImage;
