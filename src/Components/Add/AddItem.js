import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";

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

function AddItem() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), firstName: "", lastName: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleChangeInput = (id, event) => {
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
      { id: uuidv4(), firstName: "", lastName: "" },
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

  const contentContainerStyle = {
    display: "block",
    marginLeft: "50px",
    marginTop: "15px",
    marginBottom: "15px",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  };

  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [descr, setDescr] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [site, setSite] = useState("");
  const [period, setPeriod] = useState("");
  const [age, setAge] = useState("");
  const [material, setMaterial] = useState("");
  const [website, setWebsite] = useState("");
  const [size, setSize] = useState("");
  const [refrences, setRefrences] = useState("");
  const [storage, setStorage] = useState("");
  const [display, setDisplay] = useState("");
  const [showcase, setShowcase] = useState("");
  const [displayLabel, setDisplayLabel] = useState("Display");

  const selectStyle = {
    width: "220px",
    marginLeft: "50px",
  };
  const options = [
    { value: "1", label: "In Storage" },
    { value: "0", label: "In Museum" },
  ];

  return (
    <Container>
      <div>
        <h1>Add New Item</h1>
        <div className="Form">
          <form>
            <TextField
              onChange={(e) => {
                setItemId(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="itemId"
              placeholder="ID"
              helperText={itemId === "" ? "Field cannot be empty" : ""}
              error={itemId === ""}
            />
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="name"
              placeholder="name"
              helperText={name === "" ? "Field cannot be empty" : ""}
              error={name === ""}
            />
            <TextField
              onChange={(e) => {
                setDescr(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Description"
              placeholder="Description"
              helperText={descr === "" ? "Field cannot be empty" : ""}
              error={descr === ""}
            />
            <TextField
              onChange={(e) => {
                setShortDescr(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Short Description"
              placeholder="Short Description"
              helperText={shortDescr === "" ? "Field cannot be empty" : ""}
              error={shortDescr === ""}
            />

            <div style={selectStyle}>
              <Select
                onClick={() => {
                  setDisplayLabel("");
                  console.log("ASD");
                }}
                options={options}
                onChange={(e) => {
                  setStorage(e.value);
                }}
              />
            </div>

            {storage === "1" ? (
              ""
            ) : (
              <TextField
                onChange={(e) => {
                  setDisplay(e.target.value);
                }}
                variant="outlined"
                style={contentContainerStyle}
                type="text"
                name="Display"
                placeholder={displayLabel}
                helperText={display === "" && storage === "0" ? "Display" : ""}
                error={display === "" && storage === "0"}
                disabled={storage === "1"}
              />
            )}

            {storage == "1" ? (
              ""
            ) : (
              <TextField
                onChange={(e) => {
                  setShowcase(e.target.value);
                }}
                variant="outlined"
                style={contentContainerStyle}
                type="text"
                name="Showcase"
                placeholder="Showcase"
                helperText={
                  showcase === "" && storage === "0" ? "Showcase" : ""
                }
                error={showcase === "" && storage === "0"}
                disabled={storage === "1"}
              />
            )}

            <TextField
              onChange={(e) => {
                setSite(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Site"
              placeholder="Site"
              helperText={site === "" ? "Field cannot be empty" : ""}
              error={site === ""}
            />
            <TextField
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Period"
              placeholder="Period"
              helperText={period === "" ? "Field cannot be empty" : ""}
              error={period === ""}
            />
            <TextField
              onChange={(e) => {
                setAge(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Age"
              placeholder="Age"
              helperText={age === "" ? "Field cannot be empty" : ""}
              error={age === ""}
            />
            <TextField
              onChange={(e) => {
                setMaterial(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Material"
              placeholder="Material"
              helperText={material === "" ? "Field cannot be empty" : ""}
              error={material === ""}
            />
            <TextField
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Website"
              placeholder="Website"
              helperText={website === "" ? "Field cannot be empty" : ""}
              error={website === ""}
            />
            <TextField
              onChange={(e) => {
                setSize(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Size"
              placeholder="Size(h X w X d )"
              helperText={size === "" ? "Field cannot be empty" : ""}
              error={size === ""}
            />
            <TextField
              onChange={(e) => {
                setRefrences(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Refrences"
              placeholder="Refrences"
              helperText={refrences === "" ? "Field cannot be empty" : ""}
              error={refrences === ""}
            />
          </form>
        </div>
      </div>

      <form className={classes.root} onSubmit={handleSubmit}>
        {inputFields.map((inputField) => (
          <div key={inputField.id}>
            <TextField
              name="firstName"
              label="Category"
              variant="filled"
              value={inputField.firstName}
              onChange={(event) => handleChangeInput(inputField.id, event)}
            />
            <TextField
              name="lastName"
              label="Description"
              variant="filled"
              multiline
              fullWidth
              value={inputField.lastName}
              onChange={(event) => handleChangeInput(inputField.id, event)}
              rows="8"
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
        ))}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </Button>
      </form>
    </Container>
  );
}

export default AddItem;
