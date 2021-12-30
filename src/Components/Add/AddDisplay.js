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

const AddDisplay = () => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [permanent, setPermanent] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [curator, setCurator] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");

  return (
    <div>
      <TextField
        onChange={(e) => {
          setName(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="name"
        label="Building Name"
        helperText={name === "" ? "Field cannot be empty" : ""}
        error={name === ""}
      />

      <TextField
        onChange={(e) => {
          setTheme(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="Theme"
        label="Theme"
        helperText={theme === "" ? "Field cannot be empty" : ""}
        error={theme === ""}
      />

      <TextField
        onChange={(e) => {
          setPermanent(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="Permanent"
        label="Permanent?"
        helperText={permanent === "" ? "Field cannot be empty" : ""}
        error={permanent === ""}
      />

      <TextField
        onChange={(e) => {
          setStartDate(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="date"
        name="StartDate"
        helperText="Start Date"
        error={startDate === ""}
      />

      <TextField
        onChange={(e) => {
          setEndDate(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="date"
        name="EndDate"
        helperText="End Date"
        error={endDate === ""}
      />

      <TextField
        onChange={(e) => {
          setCurator(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="Curator"
        label="Curator"
        helperText={curator === "" ? "Field cannot be empty" : ""}
        error={curator === ""}
      />
      <TextField
        onChange={(e) => {
          setDesigner(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="Designer"
        label="Designer"
        helperText={designer === "" ? "Field cannot be empty" : ""}
        error={designer === ""}
      />

      <TextField
        onChange={(e) => {
          setDescription(e.target.value);
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
        onChange={(e) => {
          setReason(e.target.value);
        }}
        variant="outlined"
        style={contentContainerStyle}
        type="text"
        name="Reason"
        label="Reason"
        helperText={reason === "" ? "Field cannot be empty" : ""}
        error={reason === ""}
      />
    </div>
  );
};

export default AddDisplay;
