/* eslint-disable */
import React from "react";
import { TextField, makeStyles } from "@material-ui/core";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import Select from "react-select";
import { Container, Card } from "react-bootstrap";
import Resizer from "react-image-file-resizer";

import ReactUploadImage from "../ReactUploadImage";

const server_ip = "34.165.154.8";

const AddShowcase = (props) => {
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const [specialCare, setSpecialCare] = useState("0");
  const [specialCareDesc, setSpecialCareDesc] = useState("");
  const [showcaseList, setShowcaseList] = useState([]);
  const [displayList, setDisplayList] = useState([]);
  const [selectedValue, setSelectedValue] = useState("Please Select Display");
  const [path, setPath] = useState("");
  const [ImageFlag, setImageFlag] = useState(false);
  const [file, setFile] = useState(null);

  const cardShadow = {
    boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
    background: "#ffee9db3",
  };
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

  const fileChange = (e) => {
    setImageFlag(true);
    setFile(e.target.files[0]);
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

  const classes = styles();

  useEffect(() => {
    getDisplay();
    if (props.object != null) {
      setName(props.object.Name);
      setNumber(props.object.Number);
      setDescription(props.object.Descr);
      setType(props.object.Type);
      setSpecialCare("" + props.object.SpecialCare);
      setSelectedValue(props.object.DisplayID);
    }
  }, [props.object != null ? props.object : ""]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit();
  };

  const onFormSubmit = async () => {
    if (ImageFlag) {
      try {
        const image = await resizeFile(file);
        props.object == null ? postShowcase(image) : updateShowcase(image);
      } catch (error) {
        console.log(error.data);
      }
    } else {
      props.object == null ? postShowcase("") : updateShowcase(path);
    }
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const postShowcase = (img) => {
    if (selectedValue === "Please Select Display") {
      alert("Please Select a Display");
    } else {
      Axios.post(`http://${server_ip}:3001/addShowcase`, {
        Number: number,
        Name: name,
        Desc: description,
        Type: type,
        SpecialCare: specialCare,
        SpecialCareDescr: specialCareDesc,
        DisplayID: selectedValue,
        ImagePath: img,
      }).then(() => {
        setShowcaseList([
          ...showcaseList,
          {
            Number: number,
            Name: name,
            Desc: description,
            Type: type,
            SpecialCare: specialCare,
            SpecialCareDescr: specialCareDesc,
            DisplayID: selectedValue,
            ImagePath: img,
          },
        ]);
        alert("Success!");
        window.location.reload(false);
      });
    }
  };

  const updateShowcase = (img) => {
    Axios.put(`http://${server_ip}:3001/updateShowcase`, {
      idShowcase: props.object.idShowcase,
      Number: number,
      Name: name,
      Descr: description,
      Type: type,
      SpecialCare: specialCare,
      SpecialCareDescr: specialCareDesc,
      DisplayID: selectedValue,
      ImagePath: img,
    }).then(() => {
      setShowcaseList([
        ...showcaseList,
        {
          Number: number,
          Name: name,
          Descr: description,
          Type: type,
          SpecialCare: specialCare,
          SpecialCareDescr: specialCareDesc,
          DisplayID: selectedValue,
          ImagePath: img,
        },
      ]);
    });
  };

  const deleteShowcase = () => {
    Axios.delete(
      `http://${server_ip}:3001/deleteShowcase/${props.object.idShowcase}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  const trueFalse = [
    { value: "1", label: "Yes" },
    { value: "0", label: "No" },
  ];

  const getShowcase = () => {
    Axios.get(`http://${server_ip}:3001/Showcase`).then((response) => {
      setShowcaseList(response.data);
    });
  };

  const getDisplay = () => {
    Axios.get(`http://${server_ip}:3001/Display`).then((response) => {
      setDisplayList(response.data);
    });
  };

  const handleCallback = (childData) => {
    setPath(childData);
  };

  return (
    <>
      <Container>
        <Card style={cardShadow}>
          <Card.Title style={{ color: "black" }}>
            {props.object == null ? "Add Exibition" : "Modify Exibition"}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <div className="txtf">
                {props.object == null ? (
                  ""
                ) : (
                  <img src={props.object.ImagePath}></img>
                )}
                <TextField
                  className={classes.root}
                  value={number}
                  onChange={(event) => {
                    setNumber(event.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Number"
                  label="Number"
                />
                <TextField
                  className={classes.root}
                  style={{ marginLeft: "5px" }}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Name"
                  label="Name"
                />
                <TextField
                  className={classes.root}
                  style={{ marginLeft: "5px" }}
                  value={type}
                  onChange={(event) => {
                    setType(event.target.value);
                  }}
                  variant="outlined"
                  type="text"
                  name="Type"
                  label="Type"
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
                <div style={{ margin: "2%" }}>
                  <h6 style={{ color: "black" }}>Upload Image</h6>

                  <input
                    accept="image/png, image/gif, image/jpeg"
                    type="file"
                    name="myImage"
                    style={{ color: "black" }}
                    onChange={fileChange}
                  />
                </div>
                <label style={{ color: "black" }} htmlFor="">
                  Special Care{" "}
                </label>
                <br />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Select
                    styles={selectStyles}
                    options={trueFalse}
                    onChange={(e) => {
                      setSpecialCare(e.value);
                    }}
                  />
                </div>
                <br />
                {specialCare === "0" ? (
                  ""
                ) : (
                  <TextField
                    value={specialCareDesc}
                    onChange={(event) => {
                      setSpecialCareDesc(event.target.value);
                    }}
                    variant="outlined"
                    type="text"
                    name="specialCareDesc"
                    label="Special Care Description"
                    style={{ width: "75%" }}
                    fullWidth
                    multiline
                    rows="3"
                  />
                )}
                <br />
                <br />
                Display:
                <select
                  onChange={(event) => {
                    setSelectedValue(event.target.value);
                  }}
                >
                  {props.object == null ? (
                    <option disabled selected value>
                      Please Select Display
                    </option>
                  ) : (
                    ""
                  )}

                  {displayList.map((val, key) => {
                    return (
                      <option
                        selected={
                          (props.object != null &&
                            val.idDisplay == props.object.DisplayID) ||
                          val.idDisplay ==
                            displayList[displayList.length - 1].idDisplay
                        }
                        className="display"
                        value={val.idDisplay}
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
                  onClick={handleSubmit}
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
                    onClick={deleteShowcase}
                  >
                    Delete Exibition
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

export default AddShowcase;
