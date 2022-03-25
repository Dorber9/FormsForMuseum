/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { TextField } from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CardGroup, Card } from "react-bootstrap";

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

const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

const AddQuestion = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [wantedItem, setWantedItem] = useState("");
  const [itemData, setItemData] = useState("");
  const [correct, setCorrect] = useState("0");
  const [val, setVal] = useState("");
  const [lab, setLabel] = useState("e");

  const mapOptions = () => {
    return itemsList.map((val, key) => {
      return { value: val.ItemID, label: val.ItemName };
    });
  };

  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      hint: "",
      correct: "",
    },
  ]);

  const options = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
  ];

  // SEND TO DATABASE //
  const handleSubmit = (e) => {
    e.preventDefault();
    setItemData(inputFields);
    console.log(itemData);
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };

  /* ****** check about itemid prop in add question ***** */
  useEffect(() => {
    getItems();
    if (props.name != null) {
      setWantedItem(props.ItemID);
    }
  }, [props]);
  const classes = useStyles();

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
      {
        id: uuidv4(),
        question: "",
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        hint: "",
        correct: "",
      },
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

  return (
    <div>
      <Container>
        <Card
          className="addCard"
          border="secondary"
          style={{ padding: "10px", background: "#dbdbdbad" }}
        >
          <Card.Title>Add Questions</Card.Title>
          <Card.Body>
            <Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.name != null ? (
                  <Select
                    defaultValue={{ value: props.ItemID, label: props.name }}
                    styles={selectStyles}
                    options={itemsList.map((val, key) => {
                      return { value: val.ItemID, label: val.ItemName };
                    })}
                    onChange={(e) => {
                      setWantedItem(e.value);
                    }}
                  />
                ) : (
                  <Select
                    styles={selectStyles}
                    options={itemsList.map((val, key) => {
                      return { value: val.ItemID, label: val.ItemName };
                    })}
                    onChange={(e) => {
                      setWantedItem(e.value);
                    }}
                  />
                )}
              </div>
              {wantedItem === "" ? (
                ""
              ) : (
                <form className={classes.root} onSubmit={handleSubmit}>
                  {inputFields.map((inputField) => (
                    <div key={inputField.id}>
                      <div>
                        <TextField
                          name="question"
                          label="Question"
                          variant="filled"
                          style={{ zIndex: 1, width: "80%" }}
                          hiddenLabel
                          value={inputField.question}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />
                        <TextField
                          name="answer1"
                          label="First Answer"
                          variant="outlined"
                          style={{ width: "25%" }}
                          value={inputField.answer1}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />
                        <TextField
                          name="answer2"
                          label="Second Answer"
                          variant="outlined"
                          style={{ width: "25%" }}
                          value={inputField.answer2}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />

                        <TextField
                          name="answer3"
                          label="Third Answer"
                          variant="outlined"
                          style={{ width: "25%" }}
                          value={inputField.answer3}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />
                        <TextField
                          name="answer4"
                          label="Fourth Answer"
                          variant="outlined"
                          style={{ width: "25%" }}
                          value={inputField.answer4}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />
                        <div style={{ width: "20%", display: "inline-block" }}>
                          <Select
                            options={options}
                            styles={selectStyles}
                            onChange={(e) => {
                              setCorrect(e.value);
                              inputField.correct = e.value;
                            }}
                          />
                        </div>
                        <TextField
                          name="hint"
                          label="Hint"
                          variant="outlined"
                          style={{ width: "75%" }}
                          value={inputField.hint}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
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
                    Add Question
                  </Button>
                </form>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddQuestion;
