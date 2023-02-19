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
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [material, setMaterial] = useState("");
  const [age, setAge] = useState("");
  const [period, setPeriod] = useState("");
  const [site, setSite] = useState("");

  const [itemKeys, setKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [path, setPath] = useState("");
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    setDataWiki([]);
    console.log(props.itemId);
    Axios.get(`http://34.165.154.8:3001/Item/${props.itemId}`).then(
      (response) => {
        console.log(response.data[0]);
        setName(response.data[0].HebItemName || "");
        setMaterial(response.data[0].HebMaterial || "");
        setDesc(response.data[0].HebDescr || "");
        setAge(response.data[0].Age || "");
        setPeriod(response.data[0].HebPeriod || "");
        setSite(response.data[0].HebSite || "");
        if (response.data[0].ImagePath) setPath(response.data[0].ImagePath);
        if (response.data[0].ItemData) {
          const data = response.data[0].ItemData.split("^%^");

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
      }
    );

    setTimeout(() => {
      setLoading(false);
    }, 3000);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {loading ? (
        <div style={{ position: "center" }} className="spinner-container">
          <div className="loading-spinner"> Loading...</div>
        </div>
      ) : (
        <div className="pshDwn">
          <h1 style={{ textAlign: "center" }}>{name}</h1>

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
              <div>{desc}</div>
              &nbsp;מוצג זה נמצא ב {site}. גילו הוא בערך&nbsp;
              {age}, ולפיכך הוא משתייך לתקופה ה&nbsp;{period} . חומרו של המוצג
              הוא&nbsp;
              {material}.
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
