import React from 'react';
import Collapse from "./Add/Collapse";

import { useState, useEffect } from "react";
import Axios from "axios";

const ViewItemWiki = (props) => {

      const [itemDataWiki, setDataWiki] = useState([]);

    useEffect(() => {
        setDataWiki([])
        getItem();
      
    // eslint-disable-next-line
    }, [props.itemId]);

  
  // Get the relevant item data based on his Id
  const getItem = async () => {
    try {
      let res = await Axios.get(
        `http://34.65.174.141:3001/Item/${props.itemId}`
      );
      
      const data = res.data[0].ItemData.split("^%^");
      data.pop();
      var temp = [];

      data.forEach((element) => {
        const d = element.split("=>");
        temp.push({
          category: d[1].split("&&&")[0],
          categoryDescr: d[2],
        });
      });
      setDataWiki(temp)
      console.log(itemDataWiki)
    //   const itemResData = JSON.parse(JSON.stringify(res.data));
    //   setItemData(itemResData);
    } catch (error) {
      console.log(error.data);
    }
  };
    return (
        <>
        <div>
            
           {itemDataWiki.map((item)=> {
               return (
                   <div>
               <Collapse title={item.category}>
               {item.categoryDescr}</Collapse>
               </div>
               )
           })}
        </div>
        </>
    );
};



export default ViewItemWiki;