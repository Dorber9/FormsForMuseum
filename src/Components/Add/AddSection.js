/* eslint-disable */
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
  const [selectedValue, setSelectedValue] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  useEffect(() => {
    getBuilding();
    if (props.object != null) {
      setName(props.object.Name);
      setDescription(props.object.Description);
      setSelectedValue(props.object.BuildingID);
    }
  }, [props.object != null ? props.object : ""]);

  const postSection = () => {
    console.log("selected value is");
    console.log(selectedValue);
    if (selectedValue === "") {
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

  const updateSection = () => {
    Axios.put("http://34.65.174.141:3001/updateSection", {
      idSection: props.object.idSection,
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

  const deleteSection = () => {
    Axios.delete(
      `http://34.65.174.141:3001/deleteSection/${props.object.idSection}`,
      {}
    ).then(() => {
      window.location.reload(false);
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
          style={{ width: "75%" }}
          fullWidth
          multiline
          rows="3"
        />
        <br />
        <br />
        <div>
          <label>
            Building:
            <select
              onChange={(event) => {
                setSelectedValue(event.target.value);
              }}
            >
              {props.object == null ? (
                <option disabled selected value>
                  Please Select Building
                </option>
              ) : (
                ""
              )}

              {buildingList.map((val, key) => {
                return (
                  <option
                    selected={
                      props.object != null &&
                      val.BuildingID == props.object.BuildingID
                    }
                    className="building"
                    value={val.BuildingID}
                  >
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
          onClick={props.object == null ? postSection : updateSection}
        >
          SUBMIT
        </Button>
        {props.object == null ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ color: "white", background: "red", marginLeft: "10px" }}
            onClick={deleteSection}
          >
            Delete Section
          </Button>
        )}

        {/* <button id="check" onClick={getSection}>
          Show Sections
        </button> */}
      </div>
    </>
  );
};

export default AddSection;
