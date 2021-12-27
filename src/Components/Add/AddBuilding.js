import React from "react";
import { TextField } from "@material-ui/core";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddBuilding = () => {
  return (
    <div>
      <label>
        <br></br>
        Name:
        <TextField
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
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Address"
        />
      </label>
    </div>
  );
};

export default AddBuilding;
