import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

const AddMuseum = (props) => {
  const [name, setName] = useState("");
  const [museumList, setMuseumList] = useState([]);

  useEffect(() => {
    {
      setName(props.object != null ? props.object.name : "");
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
        window.location.reload(false);
    });
    
  };

  const getMuseum = () => {
    Axios.get("http://34.65.174.141:3001/museum").then((response) => {
      setMuseumList(response.data);
    });
  };

  return (
    <>
      {/* <div>
        <button onClick={getMuseum}>Show Museums</button>
      </div> */}

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
        <div style={{ padding: "1%" }}>
          <label htmlFor="name">Museum's name</label>
        </div>
        <TextField
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="name"
          label="Museum Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
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
            style={{color: "white", background:"red" , marginLeft:"10px"}}
            type="submit"
            onClick={deleteMuseum}
          >
            Delete Museum
          </Button>
        )}
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
