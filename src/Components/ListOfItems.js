/* eslint-disable */
import React from "react";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import "../App.css";
import SearchItem from "./SearchItem";

const ListOfItems = () => {
  const [itemID, setItemId] = useState("");

  const handleItem = (e) => {
    setItemId(e);
  };

  return (
    <>
      <div className="txtF">
        <div className="pshDwn">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Select
            name="itemsList"
            options={itemsList.map((val, key) => {
              return { value: val.ItemID, label: val.ItemName };
            })}
            onChange={(e) => {
              setItemId(e.value);
            }}
          />{" "} */}
            <SearchItem handleClick={handleItem} itemID={null} itemName={""} />
          </div>{" "}
          <div className="txtf">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                window.location.href = `/Item/${itemID}`;
              }}
            >
              Show Item{" "}
            </Button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
};

export default ListOfItems;
