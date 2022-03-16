import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import Select from "react-select";

const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };

const AddQuestion = () => {
  const [itemsList, setItemsList] = useState([]);
  const [wantedItem, setWantedItem] = useState("");

  const mapOptions = () => {
    return itemsList.map((val, key) => {
      return { value: val.ItemID, label: val.ItemName };
    });
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
    console.log(itemsList);
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Select
          styles={selectStyles}
          options={itemsList.map((val, key) => {
            return { value: val.ItemID, label: val.ItemName };
          })}
          onChange={(e) => {
            setWantedItem(e.value);
          }}
        />
      </div>
    </div>
  );
};

export default AddQuestion;
