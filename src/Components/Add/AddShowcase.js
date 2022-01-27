import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const contentContainerStyle = {
  display: "block",
  marginLeft: "5%",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddShowcase = () => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState("");
  const [specialCare, setSpecialCare] = useState("");
  const [showcaseList, setShowcaseList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Display");
  useEffect(() => {
    getDisplay();
    // eslint-disable-next-line
  }, []);

  const postShowcase = () => {
    if (selectedValue === "Please Select Display") {
      alert("Please Select a Display");
    } else {
      Axios.post("http://concise-decker-339115.oa.r.appspot.com/addShowcase", {
        Number: number,
        Name: name,
        Desc: description,
        Type: type,
        SpecialCare: specialCare,
        DisplayID: selectedValue,
      }).then(() => {
        setShowcaseList([
          ...showcaseList,
          {
            Number: number,
            Name: name,
            Desc: description,
            Type: type,
            SpecialCare: specialCare,
            DisplayID: selectedValue,
          },
        ]);
      });
    }
  };

  const getShowcase = () => {
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/Showcase").then((response) => {
      setShowcaseList(response.data);
    });
  };

  const getDisplay = () => {
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/Display").then((response) => {
      setDisplayList(response.data);
    });
  };

  return (
    <>
      <button onClick={getShowcase}>Show Showcase</button>
      {showcaseList.map((val, key) => {
        return (
          <div className="showcase">
            <div>
              <h3>Number: {val.Number}</h3>
              <h3>Name: {val.Name}</h3>
              <h3>Description: {val.Descr}</h3>
              <h3>Type: {val.Type}</h3>
              <h3>Special Care: {val.SpecialCare}</h3>
              <h3>DisplayID: {val.DisplayID}</h3>
            </div>
          </div>
        );
      })}
      <div className="txtJ">
        <TextField
          onChange={(event) => {
            setNumber(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="Number"
          label="Number"
          helperText={number === "" ? "Field cannot be empty" : ""}
          error={number === ""}
        />
        <TextField
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="Name"
          label="Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
        <TextField
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="Description"
          label="Description"
          helperText={description === "" ? "Field cannot be empty" : ""}
          error={description === ""}
        />
        <TextField
          onChange={(event) => {
            setType(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="Type"
          label="Type"
          helperText={type === "" ? "Field cannot be empty" : ""}
          error={type === ""}
        />
        <TextField
          onChange={(event) => {
            setSpecialCare(event.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="SpecialCare"
          label="Special Care?"
          helperText={specialCare === "" ? "Field cannot be empty" : ""}
          error={specialCare === ""}
        />
        Display:
        <select
          onChange={(event) => {
            setSelectedValue(event.target.value);
            console.log(event.target.value);
          }}
        >
          <option disabled selected value>
            Please Select Display
          </option>
          {displayList.map((val, key) => {
            return (
              <option className="display" value={val.idDisplay}>
                {val.idDisplay}
              </option>
            );
          })}
        </select>
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={postShowcase}
      >
        Add Showcase
      </Button>
    </>
  );
};

export default AddShowcase;
