/* eslint-disable */
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import { makeStyles } from "@material-ui/core/styles";
import Select from "react-select";
import { Container, Card } from "react-bootstrap";
import Resizer from "react-image-file-resizer";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Logo from "../../logo_amnon.png";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useState, useEffect } from "react";
import Axios from "axios";
import "../../App.css";
import AddQuestion from "./AddQuestion";
import Collapse from "./Collapse";
import ReactUploadImage from "../ReactUploadImage";
import { CardTravel } from "@material-ui/icons";

const server_ip = "34.165.154.8";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      boxShadow: " 1px 2px 5px rgb(255 203 43)",

      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
    },
    "& .MuiOutlinedInput-notchedOutline": {
      background: "rgb(3 3 1 / 83%)",
    },
    "& label.Mui-focused": {
      color: "white",
    },
    "& label": {
      color: "rgb(255 225 132)",
      marginLeft: "32%",
    },
    "& .MuiOutlinedInput-input": {
      zIndex: "1",
      color: "white",
    },
  },
  "&.Mui-focused": {
    borderColor: "yellow",
  },

  button: {
    margin: theme.spacing(1),
  },
}));

function AddItem(props) {
  const [inputFields, setInputFields] = useState(
    props.object == null
      ? [{ id: uuidv4(), category: "", categoryDescr: "" }]
      : []
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    setItemData(inputFields);

    onFormSubmit();
    // setFlag(true);
  };

  const confirm_delete = () => {
    confirmAlert({
      title: "Confirm delete",
      message: "Are you sure you want to delete this item?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteItem(""),
        },
        {
          label: "No",
        },
      ],
    });
  };

  const handleUpdateItem = (e) => {
    e.preventDefault();

    setItemData(inputFields);

    onFormSubmit();

    // setFlag(true);
  };

  const selectStyles = {
    menu: (styles, isFocused) => ({
      ...styles,
      zIndex: 999,
      background: "black",

      // "&:hover": {
      //   color: isFocused ? "black" : "white",
      // },
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isFocused ? "black" : "white",
    }),
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
  const [path, setPath] = useState("");
  const [file, setFile] = useState(null);
  const [questionsFlag, setFlag] = useState(false);
  const [ImageFlag, setImageFlag] = useState(false);
  const [newItemFlag, setNewItemFlag] = useState(false);
  const [itemData, setItemData] = useState([
    { id: uuidv4(), category: "", categoryDescr: "" },
  ]);
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);

  const cardShadow = {
    boxShadow: "inset rgb(0 0 0) -2px -1px 14px 2px",
    background: "#ffee9db3",
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });

  const styles = makeStyles((theme) => ({
    root: {
      "& .MuiOutlinedInput-root": {
        boxShadow: " 1px 2px 5px rgb(255 203 43)",

        "&.Mui-focused fieldset": {
          borderColor: "yellow",
        },
      },
      "& label.Mui-focused": {
        color: "white",
      },
      "& label": {
        color: "rgb(255 225 132)",
        marginLeft: "32%",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        background: "rgb(3 3 1 / 83%)",
      },
      "& .MuiOutlinedInput-input": {
        zIndex: "1",
        color: "white",
      },
    },
  }));

  useEffect(() => {
    console.log("rendring");
    getDisplay();
    getShowcase();
    getItems();
    if (props.object != null) {
      setItemId(props.object.ItemID);
      setName(props.object.ItemName);
      setShortDescr(props.object.ShortDescr);
      setDescr(props.object.Descr);
      setMaterial(props.object.Material);
      setPeriod(props.object.Period);
      setSite(props.object.Site);
      console.log("us effect");
      if (props.object.InStorage != null) setStorage(props.object.InStorage);

      if (storage !== "1") {
        setDisplay(props.object.DisplayID);
        setShowcase(props.object.ShowcaseID);
      }
      setAge(props.object.Age);
      setWebsite(props.object.Website);
      setSize(props.object.Size);
      setReferences(props.object.Refs);
      setInputFields([]);
      setPath(props.object.ImagePath != null ? props.object.ImagePath : "");
      if (props.object.ItemData) {
        const data = props.object.ItemData.split("^%^");
        console.log(data);
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
      } else
        setInputFields([{ id: uuidv4(), category: "", categoryDescr: "" }]);
    }
  }, [props.object != null ? props.object : "", newItemFlag]);

  const postItem = (img) => {
    if (storage === "0" && display === "") {
      alert("Please Select a Display");
    } else {
      Axios.post(`http://${server_ip}:3001/addItem`, {
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
        ImagePath: img,
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
            ImagePath: img,
            itemData: itemData,
          },
        ]);
      });
    }
  };

  const updateItem = (img) => {
    Axios.put(`http://${server_ip}:3001/updateItem`, {
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
      ImagePath: img,
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
          ImagePath: img,
          itemData: itemData,
        },
      ]);
    });
  };

  const getDisplay = () => {
    Axios.get(`http://${server_ip}:3001/Display`).then((response) => {
      setDisplayList(response.data);
    });
    displayOptions();
  };

  const getShowcase = () => {
    Axios.get(`http://${server_ip}:3001/Showcase`).then((response) => {
      setShowcaseList(response.data);
    });
    showcaseOptions();
  };

  const getItems = () => {
    Axios.get(`http://${server_ip}:3001/Item`).then((response) => {
      setItemsList(response.data);
    });
  };

  const getDisplayLabel = (displayList) => {
    let result = displayList.filter((obj) => {
      return obj.idDisplay == display;
    });
    if (result.length) return result[0].Name;
    else return "";
  };
  const getShowCaseLabel = (showCaseList) => {
    let result = showCaseList.filter((obj) => {
      return obj.idShowcase == showcase;
    });
    if (result.length) return result[0].Name;
    else return "";
  };

  const onFormSubmit = async () => {
    console.log(itemsList.map((e) => e.ItemID));
    const id_list = itemsList.map((e) => e.ItemID);
    if (props.object == null && id_list.includes(itemId)) {
      alert("Item's ID is already in the system!");
      return;
    }
    if (ImageFlag) {
      try {
        const image = await resizeFile(file);

        props.object == null ? postItem(image) : updateItem(image);
      } catch (error) {
        console.log(error.data);
      }
    } else {
      props.object == null ? postItem("") : updateItem(path);
    }
    setFlag(true);
  };

  const reRender = () => {
    setNewItemFlag(true);
    setFlag(false);
  };

  const fileChange = (e) => {
    setImageFlag(true);
    setFile(e.target.files[0]);
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

  const deleteItem = () => {
    Axios.delete(
      `http://${server_ip}:3001/deleteItem/${props.object.ItemID}`,
      {}
    ).then(() => {
      window.location.reload(false);
    });
  };

  const handleCallback = (childData) => {
    setPath(childData);
  };

  const classstyle = styles();
  const classes = useStyles();

  return (
    <>
      {" "}
      {props.object != null ? (
        <div style={{ textAlign: "center" }}>
          {" "}
          {props.object.ImagePath ? (
            <img
              src={props.object.ImagePath}
              style={{ height: "250px" }}
              alt="Oops! Something went wrong"
            />
          ) : (
            <img
              src={Logo}
              style={{ height: "150px" }}
              alt="Something is wrong"
            />
          )}{" "}
        </div>
      ) : (
        " "
      )}{" "}
      <Container>
        <Card style={cardShadow}>
          <Card.Body>
            <Card.Title style={{ color: "black" }}>
              {props.object == null ? "Add Item" : "Modify Item"}
            </Card.Title>
            <Card.Text>
              {" "}
              {questionsFlag == false ? (
                <>
                  <div className="txtf">
                    <TextField
                      className={classstyle.root}
                      value={itemId}
                      onChange={(e) => {
                        setItemId(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="itemId"
                      label="ID"
                    />
                    <TextField
                      className={classstyle.root}
                      style={{ marginLeft: "5px" }}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="name"
                      label="name"
                    />
                    <TextField
                      className={classstyle.root}
                      value={site}
                      style={{ marginLeft: "5px" }}
                      onChange={(e) => {
                        setSite(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Site"
                      label="Site"
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
                        styles={selectStyles}
                        value={{
                          value: storage,
                          label: storage === "1" ? "In Storage" : "In Museum",
                        }}
                        options={options}
                        onChange={(e) => {
                          setStorage(e.value);
                          console.log("changd the value");
                        }}
                      />{" "}
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
                          styles={selectStyles}
                          value={
                            display
                              ? {
                                  value: display,
                                  label: getDisplayLabel(displayList),
                                }
                              : {
                                  value: "Select Display",
                                  label: "Please Select Display",
                                }
                          }
                          placeholder="Select Display"
                          options={displayList.map((val, key) => {
                            return { value: val.idDisplay, label: val.Name };
                          })}
                          onChange={(e) => {
                            setDisplay(e.value);
                          }}
                        />{" "}
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
                          styles={selectStyles}
                          placeholder="Select Exibition"
                          value={
                            showcase
                              ? {
                                  value: showcase,
                                  label: getShowCaseLabel(showcaseList),
                                }
                              : {
                                  value: "Select Exibition",
                                  label: "Please Select Exibition",
                                }
                          }
                          options={showcaseList.map((val, key) => {
                            return { value: val.idShowcase, label: val.Name };
                          })}
                          onChange={(e) => {
                            setShowcase(e.value);
                          }}
                        />{" "}
                      </div>
                    )}{" "}
                    <br />
                    <br />
                    <TextField
                      className={classstyle.root}
                      value={period}
                      onChange={(e) => {
                        setPeriod(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Period"
                      label="Period"
                    />
                    <TextField
                      className={classstyle.root}
                      value={age}
                      style={{ marginLeft: "5px" }}
                      onChange={(e) => {
                        setAge(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Age"
                      label="Age"
                    />
                    <TextField
                      className={classstyle.root}
                      value={material}
                      style={{ marginLeft: "5px" }}
                      onChange={(e) => {
                        setMaterial(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Material"
                      label="Material"
                    />
                    <br />
                    <br />
                    <TextField
                      className={classstyle.root}
                      value={size}
                      onChange={(e) => {
                        setSize(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Size"
                      label="Size(l X w X t )"
                    />
                    <TextField
                      className={classstyle.root}
                      value={website}
                      style={{ marginLeft: "5px" }}
                      onChange={(e) => {
                        setWebsite(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Website"
                      label="Website"
                    />
                    <TextField
                      className={classstyle.root}
                      value={references}
                      style={{ marginLeft: "5px" }}
                      onChange={(e) => {
                        setReferences(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="References"
                      label="References"
                    />
                    <br />
                    <br />
                    <TextField
                      className={classstyle.root}
                      value={descr}
                      onChange={(e) => {
                        setDescr(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Description"
                      label="Description"
                      style={{ width: "75%" }}
                      fullWidth
                      multiline
                      rows="3"
                    />
                    <br />
                    <br />
                    <TextField
                      className={classstyle.root}
                      value={shortDescr}
                      onChange={(e) => {
                        setShortDescr(e.target.value);
                      }}
                      variant="outlined"
                      type="text"
                      name="Short Description"
                      style={{ width: "75%" }}
                      fullWidth
                      multiline
                      rows="3"
                      label="Short Description"
                    />
                    <br />
                    <br />
                    <div style={{ margin: "2%" }}>
                      <h6 style={{ color: "black" }}> Upload Image </h6>
                      <input
                        accept="image/png, image/gif, image/jpeg"
                        type="file"
                        name="myImage"
                        style={{ color: "black" }}
                        onChange={fileChange}
                      />{" "}
                    </div>
                    <form className={classes.root} onSubmit={handleSubmit}>
                      {" "}
                      {inputFields.map((inputField) => (
                        <div key={inputField.id}>
                          <TextField
                            className={classstyle.root}
                            name="category"
                            label="Category"
                            variant="outlined"
                            value={inputField.category}
                            onChange={(event) =>
                              handleChangeInput(inputField.id, event)
                            }
                          />{" "}
                          <div
                            style={{ marginRight: "10%", marginLeft: "10%" }}
                          >
                            <TextField
                              className={classstyle.root}
                              name="categoryDescr"
                              label="Description"
                              variant="outlined"
                              multiline
                              fullWidth
                              value={inputField.categoryDescr}
                              onChange={(event) =>
                                handleChangeInput(inputField.id, event)
                              }
                              rows="3"
                            />
                            <IconButton
                              disabled={inputFields.length === 1}
                              onClick={() => handleRemoveFields(inputField.id)}
                            >
                              <RemoveIcon />
                            </IconButton>{" "}
                            <IconButton onClick={handleAddFields}>
                              <AddIcon />
                            </IconButton>{" "}
                          </div>{" "}
                        </div>
                      ))}{" "}
                      <Button
                        id="bn30"
                        className={classes.button}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={
                          props.object == null ? handleSubmit : handleUpdateItem
                        }
                      >
                        SUBMIT{" "}
                      </Button>{" "}
                      {/* <button onClick={getItems}>Show Items</button> */}{" "}
                    </form>{" "}
                  </div>{" "}
                  {props.object == null ? (
                    ""
                  ) : (
                    <Button
                      variant="contained"
                      style={{
                        color: "white",
                        background: "red",
                        marginLeft: "10px",
                      }}
                      onClick={confirm_delete}
                    >
                      Delete Item{" "}
                    </Button>
                  )}{" "}
                </>
              ) : props.object == null ? (
                <div>
                  <Button
                    id="bn30"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    type="submit"
                    onClick={() =>
                      (window.location.href = `../AddQuestion/${itemId}`)
                    }
                  >
                    Add Questions to {name}{" "}
                  </Button>{" "}
                  <Button
                    id="bn30"
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    onClick={reRender}
                  >
                    Add another item
                  </Button>{" "}
                </div>
              ) : (
                <div style={{ color: "black" }}> Modified Successfully! </div>
              )}{" "}
            </Card.Text>{" "}
          </Card.Body>{" "}
        </Card>{" "}
      </Container>{" "}
    </>
  );
}

export default AddItem;
