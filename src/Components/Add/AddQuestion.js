import React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { Select } from "@mui/material";

const selectStyles = { menu: (styles) => ({ ...styles, zIndex: 999 }) };



const AddQuestion = () => {
  const [itemsList, setItemsList] = useState([]);
  const [wantedItem, setWantedItem] = useState('');

  const mapOptions = () => {
    return itemsList.map((val, key) => {
          return { value: val.ItemID, label: val.ItemName };
        });
  };
  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };
  useEffect(() => {
    getItems();
  }, []);

  return (<div className="txtf">
      <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
                        <Select
              styles={selectStyles}
              
            //   maxMenuHeight={180}
              options={mapOptions()}
              onChange={(e) => {
                setWantedItem(e.value);
              }}
            />
            
      </div>
      
      
      
      
      </div>);
};

export default AddQuestion;
