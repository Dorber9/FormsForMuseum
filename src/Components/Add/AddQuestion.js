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
      boxShadow: " 1px 2px 5px rgb(255 203 43)",

      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      background: "rgb(3 3 1 / 83%)",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "rgb(255 225 132)",
      marginLeft: "32%",
    },
    "& .MuiOutlinedInput-input": {
      zIndex: "1",
      color: "white",
    },
  },
  "&.Mui-focused": {
    borderColor: "yellow",
  },

  button: {
    margin: theme.spacing(1),
  },
}));

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

const AddQuestion = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [wantedItem, setWantedItem] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemData, setItemData] = useState([
    {
      id: uuidv4(),
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      hint: "",
      correct: "",
      qid: "",
    },
  ]);
  const [correct, setCorrect] = useState("0");
  const [val, setVal] = useState("");
  const [lab, setLabel] = useState("");
  const [emptyFlag, setFlag] = useState(false);

  const mapOptions = () => {
    return itemsList.map((val, key) => {
      return { value: val.ItemID, label: val.ItemName };
    });
  };

  const [inputFields, setInputFields] = useState(
    props.object == null
      ? [
          {
            id: uuidv4(),
            question: "",
            answer1: "",
            answer2: "",
            answer3: "",
            answer4: "",
            hint: "",
            correct: "",
            qid: "",
          },
        ]
      : []
  );

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

    postQuestion();
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    setItemData(inputFields);

    updateQuestion();
  };

  const deleteQuestion = (id) => {
    console.log(id);
    Axios.delete(`http://34.65.174.141:3001/deleteQuestion/${id}`).then(() => {
      window.location.reload(false);
    });
  };

  /* change to relevant url */
  const postQuestion = () => {
    Axios.post("http://34.65.174.141:3001/addQuestion", {
      questions: inputFields,
      itemID: wantedItem,
    }).then((response) => {
      console.log(response);
      window.location.reload(false);
    });
  };
  const updateQuestion = () => {
    Axios.put("http://34.65.174.141:3001/updateQuestion", {
      questions: inputFields,
      itemID: wantedItem,
    }).then((response) => {
      console.log(response);
      window.location.reload(false);
    });
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };

  useEffect(() => {
    getItems();
    if (props.object != null) {
      modifyInputFields("");
      return;
    }
    if (props.itemId) {
      console.log(props.itemName);
      setWantedItem(props.itemId);
      setLabel(props.itemName);
    }
  }, [props, props.itemId, props.itemName]);
  const classes = useStyles();

  const handleChangeInput = (id, name, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
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
        qid: "",
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

  const modifyInputFields = (id) => {
    setInputFields([]);
    const data = props.object;
    var temp = [];
    console.log(wantedItem);
    data.forEach((element) => {
      if (element.ObjectID == id)
        temp.push({
          id: uuidv4(),
          question: element.Question,
          answer1: element.a1,
          answer2: element.a2,
          answer3: element.a3,
          answer4: element.a4,
          hint: element.Clue,
          correct: element.Correct,
          qid: element.QuestionID,
        });
    });
    if (temp.length == 0) {
      setFlag(true);
      return;
    }
    setFlag(false);
    setInputFields(temp);
  };

  const cardShadow = {
    boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
    background: "#ffee9db3",
  };

  return (
    <div>
      <Container>
        <Card style={cardShadow}>
          <Card.Title>
            {props.object == null ? "Add Questions" : "Modify Questions"}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {props.itemId != null ? (
                  <>
                    <Select
                      value={{ value: props.itemId, label: props.itemName }}
                      styles={selectStyles}
                      options={itemsList.map((val, key) => {
                        return { value: val.ItemID, label: val.ItemName };
                      })}
                      onChange={(e) => {
                        setWantedItem(e.value);
                        modifyInputFields(e.value);
                      }}
                    />
                  </>
                ) : (
                  <Select
                    styles={selectStyles}
                    options={itemsList.map((val, key) => {
                      return { value: val.ItemID, label: val.ItemName };
                    })}
                    onChange={(e) => {
                      setItemName(e.label);
                      setWantedItem(e.value);

                      if (props.object != null) modifyInputFields(e.value);
                    }}
                  />
                )}
              </div>
              {wantedItem === "" && props.object == null ? (
                ""
              ) : (
                <form className={classes.root}>
                  {inputFields.map((inputField) => (
                    <div key={inputField.id}>
                      <div>
                        <TextField
                          className={classes.root}
                          name="question"
                          label="Question"
                          variant="outlined"
                          style={{ zIndex: 1, width: "80%" }}
                          hiddenLabel
                          value={inputField.question}
                          onChange={(event) =>
                            handleChangeInputText(inputField.id, event)
                          }
                        />
                        <TextField
                          className={classes.root}
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
                          className={classes.root}
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
                          className={classes.root}
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
                          className={classes.root}
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
                            defaultInputValue={inputField.correct}
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
                        {props.object == null ? (
                          <>
                            <IconButton
                              disabled={inputFields.length === 1}
                              onClick={() => handleRemoveFields(inputField.id)}
                            >
                              <RemoveIcon />
                            </IconButton>
                            <IconButton onClick={handleAddFields}>
                              <AddIcon />
                            </IconButton>
                          </>
                        ) : (
                          <Button
                            variant="contained"
                            style={{
                              color: "white",
                              background: "red",
                              marginLeft: "10px",
                            }}
                            type="button"
                            onClick={() => deleteQuestion(inputField.qid)}
                          >
                            Delete
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  {emptyFlag == false ? (
                    <>
                      <Button
                        className="bn30"
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={
                          props.object == null ? handleSubmit : handleUpdate
                        }
                      >
                        Submit
                      </Button>
                    </>
                  ) : emptyFlag && wantedItem != "" ? (
                    <div>
                      <h2
                        style={{
                          color: "#ff002f",
                          fontSize: "15px",
                          marginTop: "5px",
                        }}
                      >
                        No questions for this Item :({" "}
                      </h2>{" "}
                      <div>
                        {" "}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            window.location.href = `../AddQuestion/${wantedItem}`;
                          }}
                        >
                          {" "}
                          Add Questions
                        </Button>{" "}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
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
