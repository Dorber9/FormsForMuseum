/* eslint-disable */
import React from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import Logo from "../logo_amnon.png";

import "../App.css";

const SearchItem = () => {
  const [itemsList, setItemsList] = useState([]);
  const [showFlag, setShowFlag] = useState(false);
  const [tryit, setTry] = useState(false);
  const [queryFlag, setQueryFlag] = useState(false);
  const [itemPeriod, setItemPeriod] = useState([]);
  const [period, setPeriod] = useState("");
  const [itemMaterial, setItemMaterial] = useState([]);
  const [material, setMaterial] = useState("");
  const [itemSites, setItemOptions] = useState([]);
  const [site, setSite] = useState("");
  const [itemAge, setItemAge] = useState([]);
  const [age, setAge] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [itemsListImg, setItemListImg] = useState([]);

  useEffect(() => {
    getItems();

    // eslint-disable-next-line
  }, [material, queryFlag, period, site]);

  const getItems = () => {
    Axios.get("http://34.79.201.254:3001/Item").then((response) => {
      setItemsList(response.data);
      const unique = [...new Set(response.data.map((item) => item.ItemName))];
      setCategories(unique);
      if (material != "") {
        let res = itemsList.filter((mzab) => mzab.Material == material);
        setItemsList(res);
      }
      if (period != "") {
        let res = itemsList.filter((mzab) => mzab.Period == period);
        setItemsList(res);
      }
      if (site != "") {
        let res = itemsList.filter((mzab) => mzab.Site == site);
        setItemsList(res);
      }
      if (age != "") {
        let res = itemsList.filter((mzab) => mzab.Age == age);
        setItemsList(res);
      }
    });
  };
  const queryModalClose = () => {
    setQueryFlag(false);
    setMaterial("");
    setPeriod("");
    setSite("");
    setAge("");
  };

  const buildSub = (category) => {
    setCategory(category);
    const temp = itemsList.filter((item) => item.ItemName == category);
    console.log(temp);
    setItemListImg(temp);
    const uniquesites = [...new Set(temp.map((item) => item.Site))];

    const options = uniquesites.map((val, key) => {
      return { value: val, label: val };
    });

    const unique = [...new Set(temp.map((item) => item.Period))];
    const periods = unique.map((val, key) => {
      return { value: val, label: val };
    });

    const uniqueMaterial = [...new Set(temp.map((item) => item.Material))];
    const materials = uniqueMaterial.map((val, key) => {
      return { value: val, label: val };
    });

    const uniqueAge = [...new Set(temp.map((item) => item.Age))];
    const ages = uniqueAge.map((val, key) => {
      return { value: val, label: val };
    });

    setItemOptions(options);
    setItemPeriod(periods);
    setItemMaterial(materials);
    setItemAge(ages);
    setMaterial("");
    setPeriod("");
    setSite("");
    setAge("");
  };

  const getSrc = (item) => {
    if (item.ImagePath) return item.ImagePath;
    else return Logo;
  };

  const imgClicked = (item) => {
    setTry(false);
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
            options={categories.map((val, key) => {
              return { value: val, label: val };
            })}
            onChange={(e) => {
              buildSub(e.label);
            }}
          />
          <div></div>

          <Popup
            open={tryit}
            modal
            onClose={() => setTry(false)}
            position="center"
          >
            {(close) => (
              <>
                <div>
                  Choose the Right Item
                  <div>
                    {itemsListImg.map((item) => (
                      <>
                        {" "}
                        <li style={{ float: "left" }}>
                          {" "}
                          {item.ItemName}
                          <img
                            onClick={() => imgClicked(item)}
                            style={{ height: "50px", width: "50px" }}
                            src={getSrc(item)}
                          ></img>{" "}
                        </li>{" "}
                      </>
                    ))}
                  </div>
                  {/* <h1>Some Head line</h1> */}
                </div>
              </>
            )}
          </Popup>

          <Button
            variant="contained"
            style={{
              color: "white",
              background: "blue",
              marginLeft: "10px",
            }}
            onClick={() => setTry(true)}
          >
            Choose by Photo
          </Button>

          <Popup
            open={queryFlag}
            modal
            onClose={() => queryModalClose()}
            position="center"
          >
            {(close) => (
              <>
                <div>
                  Choose the Right Item
                  <div></div>
                  <div>Site:</div>
                  <Select
                    name="sitesList"
                    textFieldProps={{
                      label: "Label",
                      InputLabelProps: {
                        shrink: true,
                      },
                    }}
                    options={itemSites.map((val, key) => {
                      return { value: val.value, label: val.label };
                    })}
                    onChange={(e) => {
                      setSite(e.value);
                    }}
                  />
                  <div>Period:</div>
                  <Select
                    name="periodsList"
                    options={itemPeriod.map((val, key) => {
                      return { value: val.value, label: val.label };
                    })}
                    onChange={(e) => {
                      setPeriod(e.value);
                    }}
                  />
                  <div>Age:</div>
                  <Select
                    name="ageList"
                    options={itemAge.map((val, key) => {
                      return { value: val.value, label: val.label };
                    })}
                    onChange={(e) => {
                      setAge(e.value);
                    }}
                  />
                  <div>Material:</div>
                  <Select
                    name="materialsList"
                    options={itemMaterial.map((val, key) => {
                      return { value: val.value, label: val.label };
                    })}
                    onChange={(e) => {
                      setMaterial(e.value);
                    }}
                  />
                  <div>Item:</div>
                  <Select
                    name="allItemsList"
                    options={itemsList
                      .filter((item) =>
                        category != "" ? item.ItemName == category : item
                      )
                      .map((val, key) => {
                        return { value: val.ItemID, label: val.ItemName };
                      })}
                    onChange={(e) => {
                      // setMaterial(e.value)
                    }}
                  />
                </div>
              </>
            )}
          </Popup>

          <Button
            variant="contained"
            style={{
              color: "white",
              background: "blue",
              marginLeft: "10px",
            }}
            onClick={() => setQueryFlag(true)}
          >
            Choose by Query
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
