import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";

import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const AddSection = (props) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("Please Select Building");
  const [sectionList, setSectionList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  useEffect(() => {
    getBuilding();
    if (props.object != null) {
      setName(props.object.Name);
      setDescription(props.object.Description);
      setSelectedValue(
        buildingList.filter((b) => b.BuildingID == props.object.BuildingID)
      );
    }
  }, [props.object != null ? props.object : ""]);

  const postSection = () => {
    if (selectedValue === "Please Select Building") {
      alert("Please Select a Building");
    } else {
      Axios.post("http://34.65.174.141:3001/addSection", {
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
    Axios.get("http://34.65.174.141:3001/section").then((response) => {
      setSectionList(response.data);
    });
  };

  const getBuilding = () => {
    Axios.get("http://34.65.174.141:3001/building").then((response) => {
      setBuildingList(response.data);
    });
  };

  return (
    <>
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
      <div className="txtf">
        <TextField
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="name"
          label="Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
        <br />
        <br />
        <TextField
          value={description}
          onChange={(event) => {
            setDescription(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="Description"
          label="Description"
          helperText={description === "" ? "Field cannot be empty" : ""}
          error={description === ""}
        />
        <br />
        <br />
        <div>
          <label>
            Building:
            <select
              value={{
                value: selectedValue.BuildingID,
                label: selectedValue.Name,
              }}
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
          </label>
        </div>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={postSection}
        >
          Add Section
        </Button>
        <button id="check" onClick={getSection}>
          Show Sections
        </button>
      </div>
    </>
  );
};

export default AddSection;
