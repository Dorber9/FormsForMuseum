import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";
import AddCourse from "../Add/AddCourse";

const server_ip = "34.165.154.8";

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
  const [questAsObject, setQuestAsObject] = useState([]);

  useEffect(() => {
    getQuests();
    // eslint-disable-next-line
  }, [wantedQuest]);

  const getQuests = () => {
    Axios.get(`http://${server_ip}:3001/quest`).then((response) => {
      setQuestsList(response.data);
    });
  };

  const mapOptions = () => {
    return questsList.map((val, key) => {
      return { value: val.qid, label: val.questName };
    });
  };

  const getWantedQuest = (id) => {
    var wanted = "";
    var wantedItem = {};
    wantedItem = questsList.map((i) => {
      if (id == i.qid) {
        wanted = i;
      }
    });
    return wanted;
  };

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
        <Select
          styles={selectStyles}
          options={mapOptions()}
          onChange={(e) => setWantedQuest(e.value)}
        ></Select>
      </div>
      {wantedQuest == "" ? (
        ""
      ) : (
        <div className="tc">
          <AddCourse object={getWantedQuest(wantedQuest)} />
        </div>
      )}
    </div>
  );
};

export default ModifyCourse;
