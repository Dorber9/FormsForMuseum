import React from "react";
import { TextField } from "@material-ui/core";
import { useState } from "react";

const contentContainerStyle = {
  display: "block",
  marginLeft: "50px",
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
  const [itemsAmount, setItemsAmount] = useState([]);
  const [type, setType] = useState("");
  const [specialCare, setSpecialCare] = useState("");

  return (
    <div>
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
          setItemsAmount(event.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="number"
        name="itemsAmount"
        label="Items Amount"
        helperText={itemsAmount == "" ? "Field cannot be empty" : ""}
        error={itemsAmount == ""}
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
    </div>
  );
};

export default AddShowcase;
