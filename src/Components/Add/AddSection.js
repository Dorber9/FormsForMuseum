/* eslint-disable */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import { Container, Card } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";

const server_ip = "127.0.0.1";

const cardShadow = {
  boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
  background: "#ffee9db3",
};

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
      marginLeft: "32%",
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

const AddSection = (props) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [sectionList, setSectionList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  useEffect(() => {
    getBuilding();

    if (props.object != null) {
      setName(props.object.Name);
      setDescription(props.object.Description);
      setSelectedValue(props.object.BuildingID);
    }
  }, [props.object != null ? props.object : ""]);

  const postSection = () => {
    if (selectedValue === "") {
      alert("Please Select a Building");
    } else {
      Axios.post(`http://${server_ip}:3001/addSection`, {
        Name: name,
        Description: description,
        BuildingID: selectedValue,
      }).then(() => {
        setSectionList([
          ...sectionList,
          {
            Name: name,
            Description: description,
            BuildingID: selectedValue,
          },
        ]);
        alert("Success!");
        window.location.reload(false);
      });
    }
  };

  const updateSection = () => {
    Axios.put(`http://${server_ip}:3001/updateSection`, {
      idSection: props.object.idSection,
      Name: name,
      Description: description,
      BuildingID: selectedValue,
    }).then(() => {
      setSectionList([
        ...sectionList,
        {
          Name: name,
          Description: description,
          BuildingID: selectedValue,
        },
      ]);
    });
  };

  const getSection = () => {
    Axios.get(`http://${server_ip}:3001/section`).then((response) => {
      setSectionList(response.data);
    });
  };

  const getBuilding = () => {
    Axios.get(`http://${server_ip}:3001/building`).then((response) => {
      setBuildingList(response.data);
    });
  };

  const deleteSection = () => {
    Axios.delete(
      `http://${server_ip}:3001/deleteSection/${props.object.idSection}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  const classes = styles();

  return (
    <Container>
      <Card style={cardShadow}>
        <Card.Body>
          <Card.Text>
            <div className="txtf">
              <TextField
                className={classes.root}
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                }}
                variant="outlined"
                type="text"
                name="name"
                label="Name"
              />
              <br />
              <br />
              <TextField
                className={classes.root}
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value);
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
              <div>
                <label>
                  Building:
                  <select
                    onChange={(event) => {
                      setSelectedValue(event.target.value);
                    }}
                  >
                    {props.object == null ? (
                      <option disabled selected value>
                        Please Select Building
                      </option>
                    ) : (
                      ""
                    )}

                    {buildingList.map((val, key) => {
                      return (
                        <option
                          selected={
                            (props.object != null &&
                              val.BuildingID == props.object.BuildingID) ||
                            val.BuildingID ==
                              buildingList[buildingList.length - 1].BuildingID
                          }
                          className="building"
                          value={val.BuildingID}
                        >
                          {val.Name}
                        </option>
                      );
                    })}
                  </select>
                </label>
              </div>
              <br />
              <br />
              <Button
                className="bn30"
                variant="contained"
                color="primary"
                type="submit"
                onClick={props.object == null ? postSection : updateSection}
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
                  onClick={deleteSection}
                >
                  Delete Section
                </Button>
              )}

              {/* <button id="check" onClick={getSection}>
          Show Sections
        </button> */}
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AddSection;
