import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import Axios from "axios";

const contentContainerStyle = {
  display: "block",
  marginLeft: "50px",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddMuseum = () => {
  const [name, setName] = useState("");
  const [museumList, setMuseumList] = useState([]);
  const postMuseum = () => {
    Axios.post("http://concise-decker-339115.oa.r.appspot.com/addMuseum", {
      name: name,
    }).then(() => {
      setMuseumList([
        ...museumList,
        {
          name: name,
        },
      ]);
    });
  };

  const getMuseum = () => {
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/museum").then((response) => {
      setMuseumList(response.data);
    });
  };
  return (
    <>
      <button onClick={getMuseum}>Show Museums</button>

      {museumList.map((val, key) => {
        return (
          <div className="museum">
            <div>
              <h3>id: {val.id}</h3>
              <h3>name: {val.name}</h3>
            </div>
          </div>
        );
      })}
      <div>
        <TextField
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="name"
          label="Museum Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
      </div>
      <button onClick={postMuseum}>Add Museum</button>
    </>
  );
};

export default AddMuseum;
