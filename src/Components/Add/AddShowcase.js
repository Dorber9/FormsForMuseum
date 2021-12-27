import React from "react";
import { TextField } from "@material-ui/core";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddShowcase = () => {
  return (
    <div>
      <label>
        <br></br>
        Number:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Number"
        />
      </label>

      <label>
        <br></br>
        Name:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Name"
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

      <label>
        <br></br>
        Items Amount:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="StartDate"
        />
      </label>
      <label>
        <br></br>
        Type:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Type"
        />
      </label>

      <label>
        <br></br>
        Special Care?:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="SpecialCare"
        />
      </label>
    </div>
  );
};

export default AddShowcase;
