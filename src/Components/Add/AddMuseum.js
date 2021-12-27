import React from "react";
import { TextField } from "@material-ui/core";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddMuseum = () => {
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
    </div>
  );
};

export default AddMuseum;
