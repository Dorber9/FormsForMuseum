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
  const [flag, setFlag] = useState("");
  const [value, setValue] = useState(
    props.object === flag ? "" : props.object.name
  );

  useEffect(() => {
    {
      setFlag(props.object.name);
      setValue(props.object === flag ? "" : props.object.name);
      console.log(props);
    }

    // eslint-disable-next-line
  }, [props.object.name]);

  const postMuseum = () => {
    Axios.post("https://concise-decker-339115.oa.r.appspot.com/addMuseum", {
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
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/museum").then(
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
          value={value}
          onChange={(event) => {
            setName(event.target.value);
            setValue(event.target.value);
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
        onClick={postMuseum}
      >
        Add Museum
      </Button>
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
