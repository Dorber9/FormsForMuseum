/* eslint-disable */
import React from "react";
import { TextField } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { Container, Card } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

import "../../App.css";
const options = [
  { value: "1", label: "Permanent" },
  { value: "0", label: "Non permanent" },
];

const selectStyles = {
  menu: (styles, isFocused) => ({
    ...styles,
    zIndex: 999,
    background: "black",

    // "&:hover": {
    //   color: isFocused ? "black" : "white",
    // },
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isFocused ? "black" : "white",
  }),
};

const cardShadow = {
  boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
  background: "#ffee9db3",
};

const AddDisplay = (props) => {
  const [name, setName] = useState("");
  const [theme, setTheme] = useState("");
  const [permanent, setPermanent] = useState("1");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [curator, setCurator] = useState("Amnon Asaf");
  const [designer, setDesigner] = useState("Amnon Asaf");
  const [description, setDescription] = useState("");
  const [reason, setReason] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Section");
  const [curatorLabel, setCuratorLabel] = useState("Curator");

  const styles = makeStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-root": {
        boxShadow: " 1px 2px 5px rgb(255 203 43)",
        "&.Mui-focused fieldset": {
          borderColor: "yellow",
        },
      },
      "& label.Mui-focused": {
        color: "white",
      },
      "& label": {
        color: "rgb(255 225 132)",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        background: "rgb(3 3 1 / 83%)",
      },
      "& .MuiOutlinedInput-input": {
        zIndex: "1",
        color: "white",
      },
    },
  }));

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
        alert("Success!");
        window.location.reload(false);
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
  const classes = styles();

  return (
    <>
      <Container style={{ width: "65%" }}>
        <Card style={cardShadow}>
          <Card.Body>
            <Card.Text>
              <h4
                style={{
                  textAlign: "center",
                  marginBottom: "2%",
                  color: "black",
                }}
              >
                Add Display
              </h4>
              <div className="txtf">
                <TextField
                  className={classes.root}
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
                  className={classes.root}
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
                  className={classes.root}
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
                      className={classes.root}
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
                      className={classes.root}
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
                  className={classes.root}
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
                  className={classes.root}
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
                  className={classes.root}
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
                          (props.object != null &&
                            val.idSection == props.object.SectionID) ||
                          val.idSection ==
                            sectionList[sectionList.length - 1].idSection
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
                  className="bn30"
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
