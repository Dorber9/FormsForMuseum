import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";
import Axios from "axios";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddMuseum = () => {
  const [name, setName] = useState("");
  const [museumList, setMuseumList] = useState([]);
  const postMuseum = () => {
    Axios.post("http://localhost:3001/addMuseum", {
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
    Axios.get("http://localhost:3001/museum").then((response) => {
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
        <label>
          <br></br>
          Name:
          <TextField
            onChange={(event) => {
              setName(event.target.value);
            }}
            variant="filled"
            style={contentContainerStyle}
            type="text"
            name="name"
          />
        </label>
        <button onClick={postMuseum}>Add Museum</button>
      </div>
    </>
  );
};

export default AddMuseum;
