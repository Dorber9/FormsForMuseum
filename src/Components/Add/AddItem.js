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

function AddItem() {
  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), category: "", categoryDescr: "" },
  ]);

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

  const contentContainerStyle = {
    display: "block",
    marginLeft: "50px",
    marginTop: "15px",
    marginBottom: "15px",
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
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
  const [itemData, setItemData] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    getDisplay();
    getShowcase();
    // eslint-disable-next-line
  }, []);

  const postItem = () => {
    if (storage === "0" && display === "") {
      alert("Please Select a Display");
    } else {
      console.log(itemData);
      Axios.post("http://concise-decker-339115.oa.r.appspot.com/addItem", {
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
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/Display").then((response) => {
      setDisplayList(response.data);
    });
    displayOptions();
  };

  const getShowcase = () => {
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/Showcase").then((response) => {
      setShowcaseList(response.data);
    });
    showcaseOptions();
  };

  const getItems = () => {
    Axios.get("http://concise-decker-339115.oa.r.appspot.com/Item").then((response) => {
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
    <Container>
      <div>
        <h1>Add New Item</h1>
        <div className="Form">
          <form>
            <TextField
              onChange={(e) => {
                setItemId(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="itemId"
              placeholder="ID"
              helperText={itemId === "" ? "Field cannot be empty" : ""}
              error={itemId === ""}
            />
            <TextField
              onChange={(e) => {
                setName(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="name"
              placeholder="name"
              helperText={name === "" ? "Field cannot be empty" : ""}
              error={name === ""}
            />
            <TextField
              onChange={(e) => {
                setDescr(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Description"
              placeholder="Description"
              helperText={descr === "" ? "Field cannot be empty" : ""}
              error={descr === ""}
            />
            <TextField
              onChange={(e) => {
                setShortDescr(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Short Description"
              placeholder="Short Description"
              helperText={shortDescr === "" ? "Field cannot be empty" : ""}
              error={shortDescr === ""}
            />

            <div style={selectStyle}>
              <Select
                options={options}
                onChange={(e) => {
                  setStorage(e.value);
                }}
              />
            </div>

            {storage === "1" ? (
              ""
            ) : (
              <div style={selectStyle}>
                <Select
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
              <div style={selectStyle}>
                <Select
                  options={showcaseList.map((val, key) => {
                    return { value: val.idShowcase, label: val.Name };
                  })}
                  onChange={(e) => {
                    setShowcase(e.value);
                  }}
                />
              </div>
            )}

            <TextField
              onChange={(e) => {
                setSite(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Site"
              placeholder="Site"
              helperText={site === "" ? "Field cannot be empty" : ""}
              error={site === ""}
            />
            <TextField
              onChange={(e) => {
                setPeriod(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Period"
              placeholder="Period"
              helperText={period === "" ? "Field cannot be empty" : ""}
              error={period === ""}
            />
            <TextField
              onChange={(e) => {
                setAge(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Age"
              placeholder="Age"
              helperText={age === "" ? "Field cannot be empty" : ""}
              error={age === ""}
            />
            <TextField
              onChange={(e) => {
                setMaterial(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Material"
              placeholder="Material"
              helperText={material === "" ? "Field cannot be empty" : ""}
              error={material === ""}
            />
            <TextField
              onChange={(e) => {
                setWebsite(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Website"
              placeholder="Website"
              helperText={website === "" ? "Field cannot be empty" : ""}
              error={website === ""}
            />
            <TextField
              onChange={(e) => {
                setSize(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="Size"
              placeholder="Size(h X w X d )"
              helperText={size === "" ? "Field cannot be empty" : ""}
              error={size === ""}
            />
            <TextField
              onChange={(e) => {
                setReferences(e.target.value);
              }}
              variant="outlined"
              style={contentContainerStyle}
              type="text"
              name="References"
              placeholder="References"
              helperText={references === "" ? "Field cannot be empty" : ""}
              error={references === ""}
            />
          </form>
        </div>
      </div>

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
            <TextField
              name="categoryDescr"
              label="Description"
              variant="filled"
              multiline
              fullWidth
              value={inputField.categoryDescr}
              onChange={(event) => handleChangeInput(inputField.id, event)}
              rows="8"
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
        ))}
        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          type="submit"
          onClick={handleSubmit}
        >
          Send
        </Button>

        <Button
          className={classes.button}
          variant="contained"
          color="primary"
          onClick={() => console.log(inputFields)}
        >
          LESH
        </Button>
      </form>

      <button onClick={getItems}>Show Items</button>
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
    </Container>
  );
}

export default AddItem;
