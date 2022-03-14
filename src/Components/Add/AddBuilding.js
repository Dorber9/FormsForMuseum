/* eslint-disable */
import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";

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

const AddBuilding = (props) => {
  const [address, setAddress] = useState("1222000");
  const [city, setCity] = useState("מעיין ברוך");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState(1);
  const [buildingList, setBuildingList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
  const [building, setBuilding] = useState({});
  useEffect(() => {
    getMuseum();
    if (props.object != null) {
      setName(props.object.Name);
      setCity(props.object.City);
      setAddress(props.object.Address);
      setSelectedValue(museumList.filter((m) => m.id == props.object.MuseumID));
      console.log(selectedValue);
    }
  }, [props.object != null ? props.object : ""]);

  const postBuilding = () => {
    if (selectedValue === "Please Select Museum") {
      alert("Please Select a Museum");
    } else {
      Axios.post("http://34.65.174.141:3001/addBuilding", {
        name: name,
        city: city,
        address: address,
        MuseumID: selectedValue,
      }).then(() => {
        setBuildingList([
          ...buildingList,
          {
            name: name,
            city: city,
            address: address,
            MuseumID: selectedValue,
          },
        ]);
      });
    }
  };

  const getBuilding = () => {
    Axios.get("http://34.65.174.141:3001/building").then((response) => {
      setBuildingList(response.data);
    });
  };

  const getMuseum = () => {
    Axios.get("http://34.65.174.141:3001/museum").then((response) => {
      setMuseumList(response.data);
    });
  };

  const deleteBuilding = () => {
    Axios.delete(
      `http://34.65.174.141:3001/deleteBuilding/${props.object.BuildingID}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <>
      {buildingList.map((val, key) => {
        return (
          <div className="building">
            <div>
              <h3>id: {val.BuildingID}</h3>
              <h3>name: {val.Name}</h3>
              <h3>city: {val.City}</h3>
              <h3>address: {val.Address}</h3>
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
          label="Building Name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />
        <br />
        <br />
        <TextField
          disabled
          value={city}
          onChange={(event) => {
            setCity(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="City"
          label="City"
          helperText={city === "" ? "Field cannot be empty" : ""}
          error={city === ""}
        />
        <br />
        <br />
        <TextField
          disabled
          value={address}
          onChange={(event) => {
            setAddress(event.target.value);
          }}
          variant="outlined"
          type="text"
          name="Address"
          label="Address"
          helperText={address === "" ? "Field cannot be empty" : ""}
          error={address === ""}
        />
        <br />
        <br />
        <label>
          Museum:
          <select
            value={selectedValue}
            style={{ marginLeft: "10px" }}
            onChange={(event) => {
              setSelectedValue(event.target.value);
            }}
          >
            {props.object == null ? (
              <option disabled selected value>
                Please Select Museum
              </option>
            ) : (
              ""
            )}

            {museumList.map((val, key) => {
              if (props.object != null) {
                if (val.id == props.object.MuseumID) {
                  return (
                    <option selected className="museum" value={val.id}>
                      {val.name}
                    </option>
                  );
                }
              } else {
                return (
                  <option className="museum" value={val.id}>
                    {val.name}
                  </option>
                );
              }
            })}
          </select>
        </label>
        <br />
        <br />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          onClick={postBuilding}
        >
          Add Building
        </Button>
        {props.object == null ? (
          ""
        ) : (
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ color: "white", background: "red", marginLeft: "10px" }}
            onClick={deleteBuilding}
          >
            Delete Building
          </Button>
        )}

        <button onClick={getBuilding} id="check">
          Show Buildings
        </button>
      </div>
    </>
  );
};

export default AddBuilding;
