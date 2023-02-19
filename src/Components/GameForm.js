/**
 * Form for quest creation.
 */

import React from "react";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "react-modal";
import List from "./List";
import reactDom from "react-dom";
import { itemsList } from "../Items/Info";
import { useState, useEffect } from "react";

/**
 * style
 */
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

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

/**
 * Use states to manage live changes.
 * filter results for relevant results.
 * Open and close modal functions.
 * @returns
 */
const GameForm = () => {
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [contacts, setContacts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFilter, setFilter] = useState("Nothing");
  const [selectedFirstItem, setFirstItem] = useState("");
  const [spanId, setSpanId] = useState("");

  useEffect(() => {
    setContacts(itemsList);
  }, []);

  const filteredContacts =
    search.length === 0
      ? contacts
      : contacts.filter((contact) =>
          contact.name.toLowerCase().includes(search.toLowerCase())
        );

  const filteredContactsByID =
    search.length === 0
      ? contacts
      : contacts.filter((contact) => contact.id.startsWith(search));

  function openModal(spanId) {
    setSpanId(spanId);
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
    setFilter("Nothing");
    setSearch("");
  }

  // After choosing an item from the modal this fucntion creates a <TextField> with the
  // chosen item's name
  function closeModalChosen(item) {
    const window = (
      <TextField name="Item" disabled variant="filled" label={item} />
    );
    reactDom.render(window, document.getElementById(spanId));
    setIsOpen(false);
    setFilter("Nothing");
    setSearch("");
  }

  const classes = useStyles();
  const [inputFields, setInputFields] = useState([
    { id: uuidv4(), itemstName: "", itemsQuestion: "" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("InputFields", inputFields);
  };

  const handleSelectedItem = (e) => {
    setFirstItem(e.target.innerHTML);
    closeModalChosen(e.target.innerHTML);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      { id: uuidv4(), itemstName: "", itemsQuestion: "" },
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

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  return (
    <Container id="app">
      <h1>Create a New Course</h1>
      <form className={classes.root} onSubmit={handleSubmit}>
        <div>
          <TextField name="Course Name" label="Course Name" variant="filled" />
        </div>

        <div>
          <TextField
            name="Course Description"
            label="Course Description"
            variant="filled"
            multiline
            minRows="2"
          />
        </div>

        <div>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => openModal("firstItem")}
          >
            Choose First Item
          </Button>
          <span id="firstItem"></span>
        </div>

        {selectedFirstItem === ""
          ? null
          : inputFields.map((inputField) => (
              <div key={inputField.id}>
                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                  onClick={() => openModal(inputField.id)}
                >
                  Choose Item
                </Button>
                <span id={inputField.id}></span>

                <Button
                  className={classes.button}
                  variant="contained"
                  color="primary"
                >
                  Choose Question
                </Button>

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
          color="secondary"
          type="submit"
          onClick={handleSubmit}
        >
          Save
        </Button>
      </form>

      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Choose an Item</h2>
        <form>
          <div>
            <input
              type="radio"
              value="ID"
              name="searchBy"
              onChange={handleChange}
            />{" "}
            ID
            <input
              type="radio"
              value="Name"
              name="searchBy"
              onChange={handleChange}
            />
            Name
            <div>
              <input
                id="searchInput"
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                disabled={selectedFilter === "Nothing"}
              />
              <List
                contacts={
                  selectedFilter === "Name"
                    ? filteredContacts
                    : filteredContactsByID
                }
                closeModal={handleSelectedItem}
              />
            </div>
          </div>
          <div></div>
        </form>
        <button onClick={closeModal}>close</button>
      </Modal>
    </Container>
  );
};

export default GameForm;
