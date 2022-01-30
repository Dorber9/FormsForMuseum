import { Container, TextField } from "@material-ui/core";
import React from "react";
import Select from "react-select";
import "../../App.css";
import { makeStyles } from "@material-ui/core/styles";
import { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";

import Axios from "axios";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

const contentContainerStyle = {
  display: "block",
  marginLeft: "5%",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
  width: "20%",
};

const objectsList = [
  { value: "Display", label: "Display" },
  { value: "Showcase", label: "Showcase" },
  { value: "Item", label: "Item" },
];

const AddCourse = () => {
  const [courseName, setCourseName] = useState("");
  const [selectedObject, setSelectedObject] = useState("");
  const [itemData, setItemData] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getDisplay();
    getShowcase();
    getItems();
    // eslint-disable-next-line
  }, []);

  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), type: "", objectName: "", question: "" },
  ]);

  const addCourse = () => {};
  const handleSubmit = (e) => {
    e.preventDefault();
    setItemData(inputFields);
    addCourse();
  };

  const handleChangeInput = (id, name, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[name] = event.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleChangeInputText = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), type: "", objectName: "", question: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const getDisplay = () => {
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/Display").then(
      (response) => {
        setDisplayList(response.data);
      }
    );
    displayOptions();
  };

  const getShowcase = () => {
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/Showcase").then(
      (response) => {
        setShowcaseList(response.data);
      }
    );
    showcaseOptions();
  };

  const getItems = () => {
    Axios.get("https://concise-decker-339115.oa.r.appspot.com/Item").then(
      (response) => {
        setItemsList(response.data);
      }
    );
    itemOptions();
  };

  const displayOptions = () => {
    const temp = displayList.map((display) => ({
      value: display.idDisplay,
      label: display.Name,
    }));
    setDisplayList(temp);
  };

  const showcaseOptions = () => {
    const temp = showcaseList.map((showcase) => ({
      value: showcase.idShowcase,
      label: showcase.Name,
    }));
    setShowcaseList(temp);
  };

  const itemOptions = () => {
    const temp = itemsList.map((item) => ({
      value: item.ItemID,
      label: item.ItemName,
    }));
    setShowcaseList(temp);
  };

  return (
    <Container>
      <div className="txtj">
        <TextField
          onChange={(e) => {
            setCourseName(e.target.value);
          }}
          variant="outlined"
          style={contentContainerStyle}
          type="text"
          name="courseName"
          placeholder="Course Name"
          helperText={courseName === "" ? "Field cannot be empty" : ""}
          error={courseName === ""}
        />
        <br />
        <h2>Starting Item</h2>

        <div className="rowC">
          <Select
            name="type"
            className="rS"
            options={objectsList}
            onChange={(e) => {
              setSelectedObject(e.value);
            }}
          />
          <Select
            name="objectName"
            options={
              selectedObject == "Display"
                ? displayList.map((val, key) => {
                    return { value: val.idDisplay, label: val.Name };
                  })
                : selectedObject == "Item"
                ? itemsList.map((val, key) => {
                    return { value: val.ItemID, label: val.ItemName };
                  })
                : showcaseList.map((val, key) => {
                    return { value: val.idShowcase, label: val.Name };
                  })
            }
          />
        </div>
        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <h2>Next Item</h2>
              <div className="rowC">
                <Select
                  className="rS"
                  options={objectsList}
                  onChange={(e) => {
                    setSelectedObject(e.value);
                    handleChangeInput(inputField.id, "type", e);
                    console.log(inputFields);
                  }}
                />
                <Select
                  name="objectName"
                  options={
                    selectedObject == "Display"
                      ? displayList.map((val, key) => {
                          return { value: val.idDisplay, label: val.Name };
                        })
                      : selectedObject == "Item"
                      ? itemsList.map((val, key) => {
                          return { value: val.ItemID, label: val.ItemName };
                        })
                      : showcaseList.map((val, key) => {
                          return { value: val.idShowcase, label: val.Name };
                        })
                  }
                  onChange={(e) => {
                    setSelectedObject(e.value);
                    handleChangeInput(inputField.id, "objectName", e);
                    console.log(inputFields);
                  }}
                />
              </div>
              <div style={{ marginRight: "10%", marginLeft: "10%" }}>
                <TextField
                  name="question"
                  label="Question"
                  variant="filled"
                  multiline
                  fullWidth
                  value={inputField.question}
                  onChange={(event) =>
                    handleChangeInputText(inputField.id, event)
                  }
                  rows="6"
                />
                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          ))}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add Item
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AddCourse;
