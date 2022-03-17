/* eslint-disable */
import React from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Axios from "axios";
import ViewItemWiki from "./ViewItemWiki ";
import "../App.css";

const ListOfItems = () => {
  const [itemsList, setItemsList] = useState([]);
  const [itemID, setItemId] = useState("");

  useEffect(() => {
    getItems();
    // eslint-disable-next-line
  }, []);

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
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
            name="itemsList"
            options={itemsList.map((val, key) => {
              return { value: val.ItemID, label: val.ItemName };
            })}
            onChange={(e) => {
              setItemId(e.value);
            }}
          />
        </div>
        <br></br>
        <div className="txtf">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = `/Item/${itemID}`;
            }}
          >
            Show Item
          </Button>
        </div>
        {/* <ViewItemWiki itemId={itemID}> </ViewItemWiki> */}
      </div>
    </div>
  );
};

export default ListOfItems;
