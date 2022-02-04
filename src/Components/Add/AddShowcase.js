import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Select from "react-select";

const contentContainerStyle = {
  display: "block",
  marginLeft: "5%",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddShowcase = (props) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [type, setType] = useState("");
  const [specialCare, setSpecialCare] = useState("0");
  const [showcaseList, setShowcaseList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Display");

  useEffect(() => {
    getDisplay();
    if (props.object != null) {
      setName(props.object.Name);
      setNumber(props.object.Number);
      setDescription(props.object.Descr);
      setType(props.object.Type);
      setSpecialCare("" + props.object.SpecialCare);
      setSelectedValue(props.object.DisplayID);
    }
  }, [props.object != null ? props.object : ""]);

  const postShowcase = () => {
    if (selectedValue === "Please Select Display") {
      alert("Please Select a Display");
    } else {
      Axios.post("https://concise-decker-339115.oa.r.appspot.com/addShowcase", {
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

  const trueFalse = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  const getShowcase = () => {
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/Showcase").then(
      (response) => {
        setShowcaseList(response.data);
      }
    );
  };

  const getDisplay = () => {
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/Display").then(
      (response) => {
        setDisplayList(response.data);
      }
    );
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
          value={number}
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
          value={name}
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
          value={description}
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
          value={type}
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
        <div style={contentContainerStyle}>
          <Select
            value={{
              value: specialCare,
              label: specialCare === "1" ? "Yes" : "No",
            }}
            options={trueFalse}
            onChange={(e) => {
              setSpecialCare(e.value);
            }}
          />
        </div>
        Display:
        <select
          value={{ value: selectedValue.id, label: selectedValue.Name }}
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
                {val.Name}
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
