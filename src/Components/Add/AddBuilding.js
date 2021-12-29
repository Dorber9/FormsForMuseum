import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddBuilding = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [buildingList, setBuildingList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
  useEffect(() => {
    getMuseum();
    // eslint-disable-next-line
  }, []);

  const postBuilding = () => {
    Axios.post("http://localhost:3001/addBuilding", {
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
  };

  const getBuilding = () => {
    Axios.get("http://localhost:3001/building").then((response) => {
      setBuildingList(response.data);
    });
  };

  const getMuseum = () => {
    Axios.get("http://localhost:3001/museum").then((response) => {
      setMuseumList(response.data);
    });
  };

  return (
    <>
      <button onClick={getBuilding}>Show Buildings</button>
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
      <div>
        <label>
          <br></br>
          Name:
          <TextField
            onChange={(event) => {
              setName(event.target.value);
            }}
            variant="filled"
            style={contentContainerStyle}
            type="text"
            name="name"
          />
        </label>
        <label>
          <br></br>
          City:
          <TextField
            onChange={(event) => {
              setCity(event.target.value);
            }}
            variant="filled"
            style={contentContainerStyle}
            type="text"
            name="City"
          />
        </label>
        <label>
          <br></br>
          Address:
          <TextField
            onChange={(event) => {
              setAddress(event.target.value);
            }}
            variant="filled"
            style={contentContainerStyle}
            type="text"
            name="Address"
          />
        </label>
        <label>
          <br></br>
          Museum:
          <select
            onChange={(event) => {
              console.log(event.target.value);
              setSelectedValue(event.target.value);
            }}
          >
            {museumList.map((val, key) => {
              return (
                <option className="museum" value={val.id}>
                  {val.name}
                </option>
              );
            })}
          </select>
        </label>
        <br></br>
        <br></br>
        <button onClick={postBuilding}>Add Building</button>
      </div>
    </>
  );
};

export default AddBuilding;
