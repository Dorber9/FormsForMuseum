import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Select from "react-select";

const selectStyle = {
  width: "220px",
  marginLeft: "50px",
};
const options = [
  { value: "1", label: "Permanent" },
  { value: "0", label: "Non permanent" },
];

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
  const [sectionList, setSectionList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Section");
  useEffect(() => {
    getSection();
    // eslint-disable-next-line
  }, []);

  const postDisplay = () => {
    if (selectedValue === "Please Select Section") {
      alert("Please Select a Section");
    } else {
      Axios.post("http://localhost:3001/addDisplay", {
        Name: name,
        Theme: theme,
        permanent: permanent,
        StartDate: startDate,
        EndDate: endDate,
        Curator: curator,
        Designer: designer,
        ShortDesc: description,
        Reason: reason,
        SectionID: selectedValue,
      }).then(() => {
        setDisplayList([
          ...displayList,
          {
            Name: name,
            Theme: theme,
            permanent: permanent,
            StartDate: startDate,
            EndDate: endDate,
            Curator: curator,
            Designer: designer,
            ShortDesc: description,
            Reason: reason,
            SectionID: selectedValue,
          },
        ]);
      });
    }
  };

  const getSection = () => {
    Axios.get("http://localhost:3001/section").then((response) => {
      setSectionList(response.data);
    });
  };

  const getDisplay = () => {
    Axios.get("http://localhost:3001/display").then((response) => {
      setDisplayList(response.data);
    });
  };

  return (
    <>
      <button onClick={getDisplay}>Show Display</button>
      {displayList.map((val, key) => {
        return (
          <div className="desplay">
            <div>
              <h3>Name: {val.Name}</h3>
              <h3>Theme: {val.Theme}</h3>
              <h3>permanent: {val.permanent}</h3>
              <h3>StartDate: {val.StartDate}</h3>
              <h3>EndDate: {val.EndDate}</h3>
              <h3>Curator: {val.Curator}</h3>
              <h3>Designer: {val.Designer}</h3>
              <h3>Desc: {val.ShortDesc}</h3>
              <h3>Reason: {val.Reason}</h3>
              <h3>Section ID: {val.SectionID}</h3>
            </div>
          </div>
        );
      })}
      <div>
        <TextField
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="name"
          label="Name"
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
        <div style={selectStyle}>
          <Select
            options={options}
            onChange={(e) => {
              setPermanent(e.value);
              console.log(permanent);
            }}
          />
        </div>
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
          disabled={permanent === "1"}
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
          disabled={permanent === "1"}
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
        Section:
        <select
          onChange={(event) => {
            setSelectedValue(event.target.value);
            console.log("HI");
          }}
        >
          <option disabled selected value>
            Please Select Section
          </option>
          {sectionList.map((val, key) => {
            return (
              <option className="section" value={val.idSection}>
                {val.Name}
              </option>
            );
          })}
        </select>
        <button onClick={postDisplay}>Add Display</button>
      </div>
    </>
  );
};

export default AddDisplay;
