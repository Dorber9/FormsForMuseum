import React, { useState } from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";

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
    marginLeft: "150px",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  };

  return (
    <Container>
      <div>
        <h1>Add New Item</h1>
        <div
          className="Form"
          style={{
            textAlign: "left",
            marginLeft: "7px",
            justifyContent: "center", //Centered vertically
            alignItems: "center", // Centered horizontally
            flex: 1,
          }}
        >
          <form>
            <label>
              ID:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
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
              <br></br> Description:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Short Description:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br> Display :
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Showcase:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Site:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br> Period :
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Age:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Material:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>

            <label>
              <br></br>
              Website :
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Size(h X w X d ):
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
              />
            </label>
            <label>
              <br></br>
              Refrences:
              <TextField
                variant="filled"
                style={contentContainerStyle}
                type="text"
                name="name"
                minRow="3"
              />
            </label>
            <br></br>
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
