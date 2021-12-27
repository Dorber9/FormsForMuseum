import React from "react";
import { TextField } from "@material-ui/core";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddSection = () => {
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
        Description:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Description"
        />
      </label>
    </div>
  );
};

export default AddSection;
