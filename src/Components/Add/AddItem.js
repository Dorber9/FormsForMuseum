/* eslint-disable */
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";

import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function AddItem(props) {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState(
    props.object == null
      ? [{ id: uuidv4(), category: "", categoryDescr: "" }]
      : []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setItemData(inputFields);
    postItem();
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), category: "", categoryDescr: "" },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  const [itemId, setItemId] = useState("");
  const [name, setName] = useState("");
  const [descr, setDescr] = useState("");
  const [shortDescr, setShortDescr] = useState("");
  const [site, setSite] = useState("");
  const [period, setPeriod] = useState("");
  const [age, setAge] = useState("");
  const [material, setMaterial] = useState("");
  const [website, setWebsite] = useState("");
  const [size, setSize] = useState("");
  const [storage, setStorage] = useState("1");
  const [display, setDisplay] = useState("");
  const [showcase, setShowcase] = useState("");
  const [references, setReferences] = useState("");

  const [itemData, setItemData] = useState([
    { id: uuidv4(), category: "", categoryDescr: "" },
  ]);
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getDisplay();
    getShowcase();
    if (props.object != null) {
      setItemId(props.object.ItemID);
      setName(props.object.ItemName);
      setShortDescr(props.object.ShortDescr);
      setDescr(props.object.Descr);
      setMaterial(props.object.Material);
      setPeriod(props.object.Period);
      setSite(props.object.Site);
      setStorage("" + props.object.InStorage);
      if (storage !== "1") {
        setDisplay(props.object.DisplayID);
        setShowcase(props.object.ShowcaeID);
      }
      setAge(props.object.Age);
      setWebsite(props.object.Website);
      setSize(props.object.Size);
      setReferences(props.object.Refs);
      setInputFields([]);
      const data = props.object.ItemData.split("^%^");
      data.pop();
      var temp = [];

      data.forEach((element) => {
        const d = element.split("=>");
        temp.push({
          id: uuidv4(),
          category: d[1].split("&&&")[0],
          categoryDescr: d[2],
        });
      });
      setInputFields(temp);
    }
  }, [props.object != null ? props.object : ""]);

  const postItem = () => {
    if (storage === "0" && display === "") {
      alert("Please Select a Display");
    } else {
      console.log(itemData);
      Axios.post("http://localhost:3001/addItem", {
        ID: itemId,
        name: name,
        descr: descr,
        shortDescr: shortDescr,
        storage: storage,
        displayID: display,
        showcaseID: showcase,
        site: site,
        period: period,
        age: age,
        material: material,
        website: website,
        size: size,
        references: references,
        itemData: inputFields,
      }).then(() => {
        setItemsList([
          ...itemsList,
          {
            ID: itemId,
            name: name,
            descr: descr,
            shortDescr: shortDescr,
            storage: storage,
            displayID: display,
            showcaseID: showcase,
            site: site,
            period: period,
            age: age,
            material: material,
            website: website,
            size: size,
            references: references,
            itemData: itemData,
          },
        ]);
      });
    }
  };

  const getDisplay = () => {
    Axios.get("http://34.65.174.141:3001/Display").then((response) => {
      setDisplayList(response.data);
    });
    displayOptions();
  };

  const getShowcase = () => {
    Axios.get("http://34.65.174.141:3001/Showcase").then((response) => {
      setShowcaseList(response.data);
    });
    showcaseOptions();
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then((response) => {
      setItemsList(response.data);
    });
  };

  const selectStyle = {
    width: "220px",
    marginLeft: "50px",
  };
  const options = [
    { value: "1", label: "In Storage" },
    { value: "0", label: "In Museum" },
  ];

  const displayOptions = () => {
    const temp = displayList.map((display) => ({
      value: display.idDisplay,
      label: display.Name,
    }));
    setDisplayList(temp);
  };

  const showcaseOptions = () => {
    const temp = showcaseList.map((showcase) => ({
      value: showcase.idShowcase,
      label: showcase.Name,
    }));
    setShowcaseList(temp);
  };

  return (
    <>
      <div className="txtf">
        <TextField
          value={itemId}
          onChange={(e) => {
            setItemId(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="itemId"
          placeholder="ID"
          helperText={itemId === "" ? "Field cannot be empty" : ""}
          error={itemId === ""}
        />

        <TextField
          style={{ marginLeft: "5px" }}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="name"
          placeholder="name"
          helperText={name === "" ? "Field cannot be empty" : ""}
          error={name === ""}
        />

        <TextField
          value={site}
          style={{ marginLeft: "5px" }}
          onChange={(e) => {
            setSite(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Site"
          placeholder="Site"
          helperText={site === "" ? "Field cannot be empty" : ""}
          error={site === ""}
        />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Select
            value={{
              value: storage,
              label: storage === "1" ? "In Storage" : "In Museum",
            }}
            options={options}
            onChange={(e) => {
              setStorage(e.value);
            }}
          />
        </div>

        {storage === "1" ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              value={{
                value: display.DisplayID,
                label: display.name,
              }}
              options={displayList.map((val, key) => {
                return { value: val.idDisplay, label: val.Name };
              })}
              onChange={(e) => {
                setDisplay(e.value);
              }}
            />
          </div>
        )}

        {storage == "1" ? (
          ""
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Select
              value={{
                value: showcase.idSowcase,
                label: showcase.Name,
              }}
              options={showcaseList.map((val, key) => {
                return { value: val.idShowcase, label: val.Name };
              })}
              onChange={(e) => {
                setShowcase(e.value);
              }}
            />
          </div>
        )}
        <br />
        <br />

        <TextField
          value={period}
          onChange={(e) => {
            setPeriod(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Period"
          placeholder="Period"
          helperText={period === "" ? "Field cannot be empty" : ""}
          error={period === ""}
        />

        <TextField
          value={age}
          style={{ marginLeft: "5px" }}
          onChange={(e) => {
            setAge(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Age"
          placeholder="Age"
          helperText={age === "" ? "Field cannot be empty" : ""}
          error={age === ""}
        />

        <TextField
          value={material}
          style={{ marginLeft: "5px" }}
          onChange={(e) => {
            setMaterial(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Material"
          placeholder="Material"
          helperText={material === "" ? "Field cannot be empty" : ""}
          error={material === ""}
        />
        <br />
        <br />
        <TextField
          value={size}
          onChange={(e) => {
            setSize(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Size"
          placeholder="Size(h X w X d )"
          helperText={size === "" ? "Field cannot be empty" : ""}
          error={size === ""}
        />

        <TextField
          value={website}
          style={{ marginLeft: "5px" }}
          onChange={(e) => {
            setWebsite(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Website"
          placeholder="Website"
          helperText={website === "" ? "Field cannot be empty" : ""}
          error={website === ""}
        />
        <TextField
          value={references}
          style={{ marginLeft: "5px" }}
          onChange={(e) => {
            setReferences(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="References"
          placeholder="References"
          helperText={references === "" ? "Field cannot be empty" : ""}
          error={references === ""}
        />
        <br />
        <br />
        <TextField
          value={descr}
          onChange={(e) => {
            setDescr(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Description"
          placeholder="Description"
          helperText={descr === "" ? "Field cannot be empty" : ""}
          error={descr === ""}
        />
        <br />
        <br />
        <TextField
          value={shortDescr}
          onChange={(e) => {
            setShortDescr(e.target.value);
          }}
          variant="outlined"
          type="text"
          name="Short Description"
          placeholder="Short Description"
          helperText={shortDescr === "" ? "Field cannot be empty" : ""}
          error={shortDescr === ""}
        />
        <br />
        <br />

        <form className={classes.root} onSubmit={handleSubmit}>
          {inputFields.map((inputField) => (
            <div key={inputField.id}>
              <TextField
                name="category"
                label="Category"
                variant="filled"
                value={inputField.category}
                onChange={(event) => handleChangeInput(inputField.id, event)}
              />
              <div style={{ marginRight: "10%", marginLeft: "10%" }}>
                <TextField
                  name="categoryDescr"
                  label="Description"
                  variant="filled"
                  multiline
                  fullWidth
                  value={inputField.categoryDescr}
                  onChange={(event) => handleChangeInput(inputField.id, event)}
                  rows="3"
                />
                <IconButton
                  disabled={inputFields.length === 1}
                  onClick={() => handleRemoveFields(inputField.id)}
                >
                  <RemoveIcon />
                </IconButton>
                <IconButton onClick={handleAddFields}>
                  <AddIcon />
                </IconButton>
              </div>
            </div>
          ))}
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Add Item
          </Button>
          <button onClick={getItems}>Show Items</button>
        </form>

        {itemsList.map((val, key) => {
          return (
            <div className="desplay">
              <div>
                <h3>ID: {val.ItemID}</h3>
                <h3>Name: {val.ItemName}</h3>
                <h3>descr: {val.Descr}</h3>
                <h3>Item Data: {val.ItemData}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default AddItem;
