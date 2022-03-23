/* eslint-disable */
import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { Container, Card } from "react-bootstrap";
import "../../App.css";
const options = [
  { value: "1", label: "Permanent" },
  { value: "0", label: "Non permanent" },
];

const selectStyles = {
  menu: (styles) => ({ ...styles, zIndex: 999 }),
};

const AddDisplay = (props) => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [permanent, setPermanent] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [curator, setCurator] = useState("");
  const [designer, setDesigner] = useState("");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Section");
  const [curatorLabel, setCuratorLabel] = useState("Curator");

  useEffect(() => {
    getSection();
    if (props.object != null) {
      setName(props.object.Name);
      setTheme(props.object.Theme);
      setPermanent("" + props.object.permanent);
      if (permanent !== "1") {
        setStartDate(props.object.StartDate);
        setEndDate(props.object.EndDate);
      }
      setCurator(props.object.Curator);
      setDesigner(props.object.Designer);
      setDescription(props.object.ShortDesc);
      setReason(props.object.Reason);
      setSelectedValue(props.object.SectionID);
    }
  }, [props.object != null ? props.object : ""]);

  const postDisplay = () => {
    if (selectedValue === "Please Select Section") {
      alert("Please Select a Section");
    } else {
      Axios.post("http://34.65.174.141:3001/addDisplay", {
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

  const updateDisplay = () => {
    Axios.put("http://34.65.174.141:3001/updateDisplay", {
      idDisplay: props.object.idDisplay,
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
  };

  const deleteDisplay = () => {
    Axios.delete(
      `http://34.65.174.141:3001/deleteDisplay/${props.object.idDisplay}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  const getSection = () => {
    Axios.get("http://34.65.174.141:3001/section").then((response) => {
      setSectionList(response.data);
    });
  };

  const getDisplay = () => {
    Axios.get("http://34.65.174.141:3001/display").then((response) => {
      setDisplayList(response.data);
    });
  };

  return (
    <>
      <Container>
        <Card
          className="addCard"
          border="secondary"
          style={{ background: "#dbdbdbad" }}
        >
          <Card.Body>
            <Card.Text>
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
              <div className="txtf">
                <TextField
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="name"
                  label="Name"
                />
                <TextField
                  value={curator}
                  style={{ marginLeft: "5px" }}
                  onChange={(e) => {
                    setCurator(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Curator"
                  label={curatorLabel}
                />
                <TextField
                  value={designer}
                  style={{ marginLeft: "5px" }}
                  onChange={(e) => {
                    setDesigner(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Designer"
                  label="Designer"
                />
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Select
                    value={{
                      value: "" + permanent,
                      label: permanent == 1 ? "Permanent" : "Non permanent",
                    }}
                    options={options}
                    styles={selectStyles}
                    onChange={(e) => {
                      setPermanent(e.value);
                      console.log(permanent);
                    }}
                  />
                </div>
                <br />
                {permanent === "1" ? (
                  ""
                ) : (
                  <>
                    <TextField
                      value={startDate}
                      onChange={(e) => {
                        setStartDate(e.target.value);
                      }}
                      variant="outlined"
                      type="date"
                      name="StartDate"
                      helperText="Start Date"
                      disabled={permanent === "1"}
                    />

                    <TextField
                      style={{ marginLeft: "5px" }}
                      value={endDate}
                      onChange={(e) => {
                        setEndDate(e.target.value);
                      }}
                      variant="outlined"
                      type="date"
                      name="EndDate"
                      helperText="End Date"
                      disabled={permanent === "1"}
                    />
                    <br />
                    <br />
                  </>
                )}
                <TextField
                  value={theme}
                  onChange={(e) => {
                    setTheme(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Theme"
                  label="Theme"
                />
                <TextField
                  style={{ marginLeft: "5px" }}
                  value={reason}
                  onChange={(e) => {
                    setReason(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Reason"
                  label="Reason"
                />
                <br />
                <br />
                <TextField
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Description"
                  label="Description"
                  style={{ width: "75%" }}
                  fullWidth
                  multiline
                  rows="3"
                />
                <br />
                <br />
                Section:
                <select
                  onChange={(event) => {
                    setSelectedValue(event.target.value);
                  }}
                >
                  {props.object == null ? (
                    <option disabled selected value>
                      Please Select Section
                    </option>
                  ) : (
                    ""
                  )}

                  {sectionList.map((val, key) => {
                    return (
                      <option
                        selected={
                          props.object != null &&
                          val.idSection == props.object.SectionID
                        }
                        className="section"
                        value={val.idSection}
                      >
                        {val.Name}
                      </option>
                    );
                  })}
                </select>
                <br />
                <br />
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={props.object == null ? postDisplay : updateDisplay}
                >
                  SUBMIT
                </Button>
                {props.object == null ? (
                  ""
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{
                      color: "white",
                      background: "red",
                      marginLeft: "10px",
                    }}
                    onClick={deleteDisplay}
                  >
                    Delete Display
                  </Button>
                )}
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AddDisplay;
