import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";

const contentContainerStyle = {
  display: "block",
  marginLeft: "50px",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddSection = () => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("Please Select Building");
  const [sectionList, setSectionList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  useEffect(() => {
    getBuilding();
    // eslint-disable-next-line
  }, []);

  const postSection = () => {
    if (selectedValue === "Please Select Building") {
      alert("Please Select a Building");
    } else {
      Axios.post("http://localhost:3001/addSection", {
        Name: name,
        Description: description,
        BuildingID: selectedValue,
      }).then(() => {
        setSectionList([
          ...sectionList,
          {
            Name: name,
            Description: description,
            BuildingID: selectedValue,
          },
        ]);
      });
    }
  };

  const getSection = () => {
    Axios.get("http://localhost:3001/section").then((response) => {
      setSectionList(response.data);
    });
  };

  const getBuilding = () => {
    Axios.get("http://localhost:3001/building").then((response) => {
      setBuildingList(response.data);
    });
  };

  return (
    <>
      <button onClick={getSection}>Show Sections</button>
      {sectionList.map((val, key) => {
        return (
          <div className="section">
            <div>
              <h3>id: {val.idSection}</h3>
              <h3>name: {val.Name}</h3>
              <h3>description: {val.Description}</h3>
              <h3>building: {val.BuildingID}</h3>
            </div>
          </div>
        );
      })}
      <div>
        <TextField
          onChange={(event) => {
            setName(event.target.value);
          }}
          style={contentContainerStyle}
          variant="outlined"
          type="text"
          name="name"
          label="Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
        <TextField
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          style={contentContainerStyle}
          variant="outlined"
          type="text"
          name="Description"
          label="Description"
          helperText={description === "" ? "Field cannot be empty" : ""}
          error={description === ""}
        />
        Building:
        <select
          onChange={(event) => {
            console.log(event.target.value);
            setSelectedValue(event.target.value);
          }}
        >
          <option disabled selected value>
            Please Select Building
          </option>
          {buildingList.map((val, key) => {
            return (
              <option className="building" value={val.BuildingID}>
                {val.Name}
              </option>
            );
          })}
        </select>
        <button onClick={postSection}>Add Section</button>
      </div>
    </>
  );
};

export default AddSection;
