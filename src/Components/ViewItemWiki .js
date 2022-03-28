/* eslint-disable */
import React from "react";
import Collapse from "./Add/Collapse";
import QRCode from "react-qr-code";
import Logo from "../logo_amnon.png"
import { useState, useEffect } from "react";
import Axios from "axios";

const ViewItemWiki = (props) => {
  const [itemDataWiki, setDataWiki] = useState([]);
  const [itemData, setData] = useState([]);
  const [itemKeys, setKeys] = useState([]);
  const [path, setPath] = useState("");

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

      console.log(itemData);
      const data = res.data[0].ItemData.split("^%^");
      setPath(res.data[0].ImagePath);
      console.log(res.data[0].ImagePath);
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

      //   const itemResData = JSON.parse(JSON.stringify(res.data));
      //   setItemData(itemResData);
    } catch (error) {
      console.log(error.data);
    }
  };
  return (
    <>
      <div className="pshDwn">
        <div style={{ textAlign: "center" }}>
          {path.length!=0 ? 
          <img src={path} alt="LA" /> : <img src={Logo} style={{height:"150px"}} alt="Something is wrong" />  }
        </div>
        {
          
          <h1 style={{ textAlign: "center" }}>{itemData.ItemName}</h1>

          //    itemKeys.map((key)=> {
          //        if(key!="ItemData") {
          //        return (
          //         <div>
          //             <h7>{key} :</h7>
          //             <h8>{itemData[key]}</h8>
          //             </div>
          //        )
          //        }
          //    })
        }
        {itemDataWiki.map((item) => {
          return (
            <div>
              <Collapse title={item.category}>{item.categoryDescr}</Collapse>
            </div>
          );
        })}
        <div style={{marginTop: "50px" , textAlign: "center"}}>
        <QRCode value={`${window.location.href}`} size="150" />
        </div>
      </div>
    </>
  );
};

export default ViewItemWiki;
