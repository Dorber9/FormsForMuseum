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
import { Container, Card } from "react-bootstrap";

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

const selectStyles = {
  menu: (styles, isFocused) => ({
    ...styles,
    zIndex: 999,
    background: "black",
    layout: "inline",
    width: "150%",
  }),
  option: (provided, state) => ({
    ...provided,
    layout: "inline",
    color: state.isFocused ? "black" : "white",
  }),
  control: (styles) => ({
    ...styles,
    marginLeft: "5%",
  }),
};

const AddCourse = (props) => {
  const [questionsList, setQuestionsList] = useState([]);

  const [itemsList, setItemsList] = useState([]);
  const [wantedItem, setWantedItem] = useState("");
  const [flag, setFlag] = useState(false);
  const [courseName, setCourseName] = useState("");
  const [inputFields, setInputFields] = useState(
    props.object == null
      ? [
          {
            id: uuidv4(),
            itemId: "",
            questionId: "",
          },
        ]
      : []
  );

  const classstyle = styles();
  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        itemId: "",
        questionId: "",
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

  const getQuestions = () => {
    Axios.get("http://34.65.174.141:3001/question").then((response) => {
      setQuestionsList(response.data);
    });
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };

  const mapOptions= ()=> {
    let temp=[]
    questionsList.forEach((q)=> {
        if(q.ObjectID==wantedItem){
            temp.push({ value: q.QuestionID, label: q.Question })
        }
    })
    return temp

  }

  const postCourse = (e) => {
    e.preventDefault();
    const data = inputFields.map((x) =>
      Object.keys(x)
        .filter((key) => key == "questionId")
        .map((key) => `${x[key]}`)
        
    );
    let temp=""
    data.forEach((element)=> {
        temp+=`${element}-`
    })
    Axios.post("http://34.65.174.141:3001/addQuest", {
      questName: courseName,
      questions: temp,
    }).then(() => {
      alert("Success!");
      window.location.reload(false);
    });
  };
  useEffect(() => {
    getItems();
    getQuestions();
    // if (props.object != null) {
    //   modifyInputFields("");
    //   return;
    // }
    // if (props.itemId) {
    //   setWantedItem(props.itemId);
    //   setLabel(props.itemName);
    // }
  }, [props]);

  return (
    <div>
      <Container>
        <Card style={cardShadow}>
          <Card.Title style={{ color: "black" }}>
            {props.object == null ? "Add Quest" : "Modify Quest"}
          </Card.Title>
          <Card.Body>
            <Card.Text>
              <div className="txtf">
                <TextField
                  className={classstyle.root}
                  value={courseName}
                  name="Course Name"
                  label="Course Name"
                  variant="outlined"
                  style={{ width: "25%" }}
                  onChange={(e) => setCourseName(e.target.value)}
                />
              </div>
              <form className={classstyle.root}>
                {inputFields.map((inputField) => (
                  <>
                    <div key={inputField.id}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "10px",
                        }}
                      >
                        <Select
                          placeholder="Please select Item"
                          styles={selectStyles}
                          options={itemsList.map((val, key) => {
                            return { value: val.ItemID, label: val.ItemName };
                          })}
                          onChange={(e) => {
                            setWantedItem(e.value);
                            inputField.itemId = e.value;
                          }}
                        />
                        <Select
                          placeholder="Please select Question"
                          styles={selectStyles}
                          options={mapOptions()}
                          onChange={(e) => {
                            inputField.questionId = e.value;
                          }}
                        />
                      </div>
                    </div>

                    <IconButton
                      disabled={inputFields.length === 1}
                      onClick={() => handleRemoveFields(inputFields.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <IconButton onClick={handleAddFields}>
                      <AddIcon />
                    </IconButton>
                  </>
                ))}
                <br />
                <br />
                <Button
                  className="bn30"
                  variant="contained"
                  color="primary"
                  type="submit"
                  onClick={postCourse}
                >
                  SUBMIT
                </Button>
              </form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddCourse;
