import React from "react";
import { TextField } from "@material-ui/core";

const contentContainerStyle = {
  display: "block",
  marginLeft: "150px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
};

const AddDisplay = () => {
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
        Theme:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Theme"
        />
      </label>
      <label>
        <br></br>
        Permanent?:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Permanent"
        />
      </label>

      <label>
        <br></br>
        Start Date:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="StartDate"
        />
      </label>
      <label>
        <br></br>
        End Date:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="EndDate"
        />
      </label>

      <label>
        <br></br>
        Curator:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Curator"
        />
      </label>
      <label>
        <br></br>
        Designer:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Designer"
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
        Reason:
        <TextField
          variant="filled"
          style={contentContainerStyle}
          type="text"
          name="Reason"
        />
      </label>
    </div>
  );
};

export default AddDisplay;
