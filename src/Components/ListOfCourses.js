import React from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Axios from "axios";
import "../App.css";


const ListOfCourses = () => {
  const [questsList, setquestsList] = useState([]);
  const [questID, setquestID] = useState("");

  useEffect(() => {
    getQuests();
    // eslint-disable-next-line
  }, []);

  const getQuests = () => {
    Axios.get("http://34.65.174.141:3001/quest").then((response) => {
      setquestsList(response.data);
    });
  };
  return (
    <div className="txtF">
      <div className="pshDwn">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Select
            name="questsList"
            options={questsList.map((val, key) => {
              return { value: val.qid, label: val.questName };
            })}
            onChange={(e) => {
              setquestID(e.value);
            }}
          />
        </div>
        <br></br>
        <div className="txtf">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = `/Course/${questID}`;
            }}
          >
            Demo Quest
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ListOfCourses