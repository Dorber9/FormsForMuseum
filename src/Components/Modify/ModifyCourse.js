import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";

const server_ip = "34.79.201.254";

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

const ModifyCourse = () => {
  const [questsList, setQuestsList] = useState([]);
  const [wantedQuest, setWantedQuest] = useState("");

  const getQuests = () => {
    Axios.get(`http://${server_ip}:3001/quest`).then((response) => {
      setQuestsList(response.data);
    });
    console.log(questsList);
    return questsList.map((val, key) => {
      return { value: val.qid, label: val.questName };
    });
  };

  useEffect(() => {
    getQuests();
    // eslint-disable-next-line
  }, [wantedQuest]);

  return (
    <div
      className="tb"
      style={{ minHeight: `calc(100vh - 80px)`, textAlign: "center" }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select styles={selectStyles} options={getQuests()}></Select>
      </div>
    </div>
  );
};

export default ModifyCourse;
