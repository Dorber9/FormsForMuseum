/* eslint-disable */
import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import {
  Container,
  Card,
} from "react-bootstrap";

const AddShowcase = (props) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [specialCare, setSpecialCare] = useState("0");
  const [specialCareDesc, setSpecialCareDesc] = useState("");
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
      Axios.post("http://34.65.174.141:3001/addShowcase", {
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
    Axios.get("http://34.65.174.141:3001/Showcase").then((response) => {
      setShowcaseList(response.data);
    });
  };

  const getDisplay = () => {
    Axios.get("http://34.65.174.141:3001/Display").then((response) => {
      setDisplayList(response.data);
    });
  };

  return (
    <>
    <Container>
      <Card className="addCard" border="secondary" style={{background: "#8080808a"}} >
        <Card.Body>
             
              <Card.Text>
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
      <div className="txtf">
        <TextField
          value={number}
          onChange={(event) => {
            setNumber(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="Number"
          label="Number"
          helperText={number === "" ? "Field cannot be empty" : ""}
          error={number === ""}
        />
        <TextField
          style={{ marginLeft: "5px" }}
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="Name"
          label="Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
        <TextField
          style={{ marginLeft: "5px" }}
          value={type}
          onChange={(event) => {
            setType(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="Type"
          label="Type"
          helperText={type === "" ? "Field cannot be empty" : ""}
          error={type === ""}
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
          helperText={description === "" ? "Field cannot be empty" : ""}
          error={description === ""}
        />
        <br />
        <label htmlFor="">Special Care </label>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          
          <Select
            
            options={trueFalse}
            onChange={(e) => {
              setSpecialCare(e.value);
            }}
          />
        </div>
        <br />
        {specialCare === "0" ? (
          ""
        ) : (
          <TextField
            value={specialCareDesc}
            onChange={(event) => {
              setSpecialCareDesc(event.target.value);
            }}
            variant="outlined"
            type="text"
            name="specialCareDesc"
            label="Special Care Description"
            style={{ width: "75%" }}
            fullWidth
            multiline
            rows="3"
            helperText={specialCareDesc === "" ? "Field cannot be empty" : ""}
            error={specialCareDesc === ""}
          />
        )}
        <br />
        <br />
        Display:
        <select
          onChange={(event) => {
            setSelectedValue(event.target.value);
          }}
        >
          {props.object == null ? (
            <option disabled selected value>
              Please Select Display
            </option>
          ) : (
            ""
          )}

          {displayList.map((val, key) => {
            if (props.object != null) {
              if (val.idDisplay == props.object.DisplayID) {
                return (
                  <option selected className="display" value={val.idDisplay}>
                    {val.Name}
                  </option>
                );
              }
            } else {
              return (
                <option className="display" value={val.idDisplay}>
                  {val.Name}
                </option>
              );
            }
          })}
        </select>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={postShowcase}
        >
          Add Showcase
        </Button>
        {/* <button id="check" onClick={getShowcase}>
          Show Showcase
        </button> */}
      </div>
          </Card.Text>
      </Card.Body>
      </Card>
      </Container>
    </>
  );
};

export default AddShowcase;
