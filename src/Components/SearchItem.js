/* eslint-disable */
/**
 * Component for item's search
 * Search by query
 * Serach by ID
 * Search by photo
 */

import React from "react";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import Axios from "axios";
import Popup from "reactjs-popup";
import Logo from "../logo_amnon.png";
import "../App.css";

const selectStyles = {
  menu: (styles, isFocused) => ({
    ...styles,
    zIndex: 999,
    background: "black",
    layout: "inline",
    width: "150%",
  }),
  option: (provided, state) => ({
    ...provided,
    layout: "inline",
    color: state.isFocused ? "black" : "white",
  }),
  control: (styles) => ({
    ...styles,
  }),
};

/**
 * Get all items.
 * Filter by users request.
 * @param {*} param0 
 * @returns 
 */
const SearchItem = ({ handleClick, currentItem, itemName, quizFlag }) => {
  const [itemsList, setItemsList] = useState([]);
  const [showFlag, setShowFlag] = useState(false);
  const [tryit, setTry] = useState(false);
  const [queryFlag, setQueryFlag] = useState(false);
  const [byWhat, setByWhat] = useState("ID");
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
  }, [material, queryFlag, period, site, itemName]);

  const getItems = () => {
    Axios.get("http://34.165.154.8:3001/Item").then((response) => {
      let itemsList = response.data;
      if (quizFlag) {
        Axios.get("http://34.165.154.8:3001/question").then((response) => {
          let questionsIds = response.data.map((element) => element.ObjectID);
          let itemsFiltered = itemsList.filter((element) =>
            questionsIds.includes(element.ItemID)
          );
          setItemsList(itemsFiltered);
          const unique = [
            ...new Set(itemsFiltered.map((item) => item.ItemName)),
          ];
          setCategories(unique);
        });
      } else {
        const unique = [...new Set(response.data.map((item) => item.ItemName))];
        setCategories(unique);
        setItemsList(response.data);
      }
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

  const getItemsID = () => {
    Axios.get("http://34.165.154.8:3001/Item").then((response) => {
      setItemsList(response.data);
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
    handleClick(item.ItemID);
  };

  const changBy = (e) => {
    setByWhat(e.target.value);
  };

  return (
    <div className="txtF">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              padding: 15,
              color:
                window.location.pathname == "/ModifyData" ? "white" : "black",
            }}
            onChange={changBy}
          >
            <input type="radio" value="ID" name="byWhat" onChange={changBy} />
            By ID
            <input
              style={{ marginLeft: 6 }}
              type="radio"
              value="pq"
              name="byWhat"
              onChange={changBy}
            />
            By Photo/Query
            <input
              style={{ marginLeft: 6 }}
              type="radio"
              value="rfid"
              name="byWhat"
              onChange={changBy}
            />
            By RFID
          </div>
          {byWhat == "ID" ? (
            <div>
              <Select
                name="itemsList"
                styles={selectStyles}
                defaultValue={
                  itemName != ""
                    ? { value: itemName, label: itemName }
                    : { value: "", label: "Select..." }
                }
                options={itemsList.map((e) => {
                  return { value: e.ItemID, label: e.ItemName };
                })}
                onChange={(e) => {
                  handleClick(e.value);
                }}
              />
            </div>
          ) : byWhat == "pq" ? (
            <div>
              <Select
                name="itemsList"
                styles={selectStyles}
                defaultValue={
                  itemName != ""
                    ? { value: itemName, label: itemName }
                    : { value: "", label: "Select..." }
                }
                options={categories.map((val, key) => {
                  return { value: val, label: val };
                })}
                onChange={(e) => {
                  buildSub(e.label);
                }}
              />
            </div>
          ) : (
            <div>
              <Select
                name="itemsList"
                styles={selectStyles}
                defaultValue={
                  itemName != ""
                    ? { value: itemName, label: itemName }
                    : { value: "", label: "Select..." }
                }
                options={itemsList.map((e) => {
                  return { value: e.rfid_id, label: e.ItemName };
                })}
                onChange={(e) => {
                  buildSub(e.label);
                }}
              />
            </div>
          )}

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
                        <li style={{ float: "left", marginLeft: "10px" }}>
                          {" "}
                          {/* {item.ItemName} */}
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
          {category == "" || byWhat != "pq" ? (
            ""
          ) : (
            <Button
              variant="contained"
              style={{
                color: "white",
                background: "blue",
                marginTop: "10px",
              }}
              onClick={() => setTry(true)}
            >
              Choose by Photo
            </Button>
          )}

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
                    styles={selectStyles}
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
                    styles={selectStyles}
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
                    styles={selectStyles}
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
                    styles={selectStyles}
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
                    styles={selectStyles}
                    defaultValue={
                      currentItem == null
                        ? { value: "", label: "Please Select Item" }
                        : {
                            value: currentItem.itemId,
                            label: category,
                          }
                    }
                    options={itemsList
                      .filter((item) =>
                        category != "" ? item.ItemName == category : item
                      )
                      .map((val, key) => {
                        return { value: val.ItemID, label: val.ItemName };
                      })}
                    onChange={(e) => {
                      handleClick(e.value);
                    }}
                  />
                  <Button
                    variant="contained"
                    style={{
                      color: "white",
                      background: "blue",
                      marginLeft: "38%",
                      marginTop: "10px",
                    }}
                    onClick={() => setQueryFlag(false)}
                  >
                    Choose Item
                  </Button>
                </div>
              </>
            )}
          </Popup>
          {category == "" || byWhat != "pq" ? (
            ""
          ) : (
            <Button
              variant="contained"
              style={{
                color: "white",
                background: "blue",
                marginTop: "10px",
              }}
              onClick={() => setQueryFlag(true)}
            >
              Choose by Query
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
