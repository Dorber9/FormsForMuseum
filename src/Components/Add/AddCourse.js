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
import { Link } from "react-router-dom";
import { getByLabelText } from "@testing-library/react";

const server_ip = "34.79.201.254";

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
    Axios.get(`http://${server_ip}:3001/question`).then((response) => {
      setQuestionsList(response.data);
    });
  };

  const getItems = () => {
    Axios.get(`http://${server_ip}:3001/Item`).then((response) => {
      setItemsList(response.data);
    });
  };

const handleItemChange= (e)=> {
  setWantedItem(e.value);
  setFlag(true);

}

const mapOptions = () => {
  console.log(" im here mapping the options")
    let temp = [];
    questionsList.forEach((q) => {
      if (q.ObjectID == wantedItem) {
        temp.push({ value: q.QuestionID, label: q.Question });
      }
    });
    return temp;
  };

const mapOptionSelected = (id) => {
    console.log("im here")
    console.log("flag is " + flag)

    let temp = [];
    questionsList.forEach((q) => {
      if (q.ObjectID == id) {
        temp.push({ value: q.QuestionID, label: q.Question });
      }
    });
    return temp;
  };

const mapItemsTry = (wantedId) => {
    let temp = [];
    itemsList.forEach((item) => {
      if (wantedId == item.ItemID) {
        temp.push({ value: wantedId, label: item.ItemName , selected : item.ItemName });
      }
    });
    return temp;

}



  const postCourse = (e) => {
    e.preventDefault();
    const data = inputFields.map((x) =>
      Object.keys(x)
        .filter((key) => key == "questionId")
        .map((key) => `${x[key]}`)
    );
    let temp = "";
    data.forEach((element, index) => {
      if (index < data.length - 1) {
        temp += `${element}-`;
      } else {
        temp += `${element}`;
      }
    });
    const itemNames = inputFields.map((x) =>
      Object.keys(x)
        .filter((key) => key == "itemId")
        .map((key) => `${x[key]}`)
    );
    // itemNames.shift();
    let itemstemp = "";
    itemNames.forEach((element, index) => {
      if (index < itemNames.length - 1) {
        itemstemp += `${element}%^%`;
      } else {
        itemstemp += `${element}`;
      }
    });

    if(props.object==null ){
      Axios.post(`http://${server_ip}:3001/addQuest`, {
        questName: courseName,
        questions: temp,
        itemNames: itemstemp,
      }).then(() => {
        alert("Success!");
        window.location.reload(false);
      });
    }
    else
    {
        Axios.put(`http://${server_ip}:3001/updateQuest`, {
        id: props.object.qid,
        questName: courseName,
        questions: temp,
        itemNames: itemstemp,
      }).then(() => {
        alert("Success!");
        window.location.reload(false);
      });
    }
  };

  const deleteQuest = () => {
    Axios.delete(
      `http://${server_ip}:3001/deleteQuest/${props.object.qid}`,
      {}
    ).then(() => {
      alert("Quest Deleted");
      window.location.reload(false);
    });
  };

  useEffect(() => {
    getItems();
    getQuestions();
    if (props.object != null) {
      setCourseName(props.object.questName);
      let questions=[]
      questions = props.object.questions.split("-");
      let relevantQuestions=questionsList.filter(question => questions.includes(question.QuestionID.toString()))

      if (relevantQuestions.length>0) {
        var temp = [];
        relevantQuestions.forEach((e) => {
          temp.push({
            id: uuidv4(),
            itemId: e.ObjectID,
            questionId: e.QuestionID,
          });
        });
        setInputFields(temp);
      }

    }
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
              <div style={{ marginBottom: "20px" }}></div>
              <div className="txtf">
                <TextField
                  className={classstyle.root}
                  value={courseName}
                  name="Course Name"
                  label="Quest's Name"
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
                          defaultValue= {props.object==null ? {value:"" ,label: "Select Item"}:{value: inputField.itemId, label: itemsList.filter(item=>item.ItemID == inputField.itemId).map(item=>item.ItemName)[0] }}
                          options={itemsList.map((val, key) => {
                            return {
                              value: val.ItemID,
                              label: val.ItemName,

                            };
                          })}
                          onChange={(e) => {
                            handleItemChange(e,inputField);
                          }}
                        />
                        <Select
                          placeholder="Please select Question"
                          styles={selectStyles}
                          defaultValue= {props.object==null ? {value:"" ,label: "Please Select Question"}:{value: inputField.questionId, label: questionsList.filter(question=>question.QuestionID == inputField.questionId).map(question=>question.Question)[0] }}
                          options={ props.object==null || flag==true ? mapOptions() : mapOptionSelected(inputField.itemId)}
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
                  {props.object==null ? "SUBMIT" : "UPDATE" }
                </Button>
              </form>
              {props.object == null ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  style={{
                    color: "white",
                    background: "red",
                    marginLeft: "10px",
                  }}
                  type="submit"
                  onClick={deleteQuest}
                >
                  Delete Museum
                </Button>
              )}
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AddCourse;
