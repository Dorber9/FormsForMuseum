/* eslint-disable */
import React from "react";
import Collapse from "./Add/Collapse";
import QRCode from "react-qr-code";
import Logo from "../logo_amnon.png";
import { useState, useEffect } from "react";
import Axios from "axios";
import { listItemSecondaryActionClasses } from "@mui/material";
import { Translate, Translator } from "react-auto-translate";

const ViewItemWiki = (props) => {
  const [itemDataWiki, setDataWiki] = useState([]);
  const [itemData, setData] = useState([]);
  const [itemKeys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    setDataWiki([]);
    getItem();

    // eslint-disable-next-line
  }, [props]);

  // Get the relevant item data based on his Id
  const getItem = async () => {
    try {
      let res = await Axios.get(
        `http://34.65.174.141:3001/Item/${props.itemId}`
      );

      setData(res.data[0]);
      

      setKeys(Object.keys(itemData));
      if(res.data[0].ItemData){
        const data = res.data[0].ItemData.split("^%^");
        setPath(res.data[0].ImagePath);
        data.pop();
        var temp = [];

        data.forEach((element) => {
          const d = element.split("=>");
          temp.push({
            category: d[1].split("&&&")[0],
            categoryDescr: d[2],
          });
        });
      setDataWiki(temp);
      }
      setTimeout(() => {
        setLoading(false);
      }, 3000);
      //   const itemResData = JSON.parse(JSON.stringify(res.data));
      //   setItemData(itemResData);
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <>
      {loading ? (
        <div style={{ position: "center" }} className="spinner-container">
          <div className="loading-spinner"> Loading...</div>
          
        </div>
      ) : (
        <div className="pshDwn">
          <h1 style={{ textAlign: "center" }}>{itemData.ItemName}</h1>

          <div style={{ textAlign: "center" }}>
            {path != "" ? (
              <img
                src={path}
                style={{ height: "250px" }}
                alt="Oops! Something went wrong"
              />
            ) : (
              <img
                src={Logo}
                style={{ height: "150px" }}
                alt="Something is wrong"
              />
            )}
          </div>

          <div>
            <h2 style={{ textAlign: "center", direction: "rtl" }}>
              <div>{itemData.Descr}</div>
              &nbsp;מוצג זה נמצא ב {itemData.Site}. גילו הוא בערך&nbsp;
              {itemData.Age}, ולפיכך הוא משתייך לתקופה ה&nbsp;{itemData.Period}{" "}
              . חומרו של המוצג הוא&nbsp;
              {itemData.Material}.
            </h2>
          </div>

          {itemDataWiki.map((item) => {
            return (
              <div>
                <Collapse title={item.category}>{item.categoryDescr}</Collapse>
              </div>
            );
          })}
          <div style={{ marginTop: "50px", textAlign: "center" }}>
            {token === "abc" ? (
              <QRCode value={`${window.location.href}`} size="150" />
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ViewItemWiki;
