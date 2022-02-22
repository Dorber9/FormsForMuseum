import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const contentContainerStyle = {
  // display: "block",
  // marginLeft: "50px",
  // marginTop: "15px",
  // marginBottom: "15px",
  // justifyContent: "center", //Centered vertically
  // alignItems: "center", // Centered horizontally
  // flex: 1,
};

const AddMuseum = (props) => {
  const [name, setName] = useState("");
  const [museumList, setMuseumList] = useState([]);

  useEffect(() => {
    {
      setName(props.object != null ? props.object.name : "");
      console.log(props);
    }

    // eslint-disable-next-line
  }, [props.object != null ? props.object : ""]);

  const postMuseum = () => {
    Axios.post("http://34.65.174.141:3001/addMuseum", {
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

  const updateMuseum = () => {
    Axios.put("http://34.65.174.141:3001/updateMuseum", {
      id: props.object.id,
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

  const deleteMuseum = () => {
    Axios.delete(
      `http://34.65.174.141:3001/deleteMuseum/${props.object.id}`,
      {}
    ).then(() => {
      setMuseumList([
        ...museumList,
        {
          name: name,
        },
      ]);
    });
  };

  const getMuseum = () => {
    Axios.get("http://34.65.174.141:3001/museum").then(
      (response) => {
        setMuseumList(response.data);
      }
    );
  };

  return (
    <>
      {/* <div>
        <button onClick={getMuseum}>Show Museums</button>
      </div> */}
      <br></br>
      <br></br>

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

      <div className="txtF">
        <TextField
          value={name}
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
      <br></br>
      <br></br>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={props.object == null ? postMuseum : updateMuseum}
      >
        Submit
      </Button>
      {props.object == null ? (
        ""
      ) : (
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={deleteMuseum}
        >
          Delete Museum
        </Button>
      )}
      <div>
        <button id="check" onClick={getMuseum}>
          Show Museums
        </button>
      </div>
      <br></br>
      <br></br>
    </>
  );
};

export default AddMuseum;
