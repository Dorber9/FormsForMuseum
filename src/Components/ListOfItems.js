import React from 'react';
import Select from "react-select";


import { useState, useEffect } from "react";
import Axios from "axios";
import ViewItemWiki from './ViewItemWiki ';
const ListOfItems  =() => {
     const [itemsList, setItemsList] = useState([]);
      const [itemID, setItemId] = useState("");

      useEffect(() => {
      getItems()
    // eslint-disable-next-line
  }, []);

       const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };

    return (
        <div>
             <Select
            name="itemsList"
            options={itemsList.map((val, key) => {
                    return { value: val.ItemID, label: val.ItemName };
                  })

            }
             onChange={(e) => {
                    setItemId(e.value);
                  }}
          />
          <ViewItemWiki itemId={itemID}> </ViewItemWiki>
        </div>
    );

};



export default ListOfItems;