import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";
import AddMuseum from "../Add/AddMuseum";
import AddBuilding from "../Add/AddBuilding";
import AddSection from "../Add/AddSection";
import AddDisplay from "../Add/AddDisplay";
import AddShowcase from "../Add/AddShowcase";
import AddItem from "../Add/AddItem";

import { render } from "react-dom";

const contentContainerStyle = {
  display: "block",
  marginLeft: "5%",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
  width: "40%",
};

const ModifyData = () => {
  const [selectedObject, setSelectedObject] = useState("");
  const [wantedObject, setWantedObject] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

  const [objectName, setObjectName] = useState("");

  const getDisplay = () => {
    Axios.get("http://34.65.174.141:3001/Display").then(
      (response) => {
        setDisplayList(response.data);
      }
    );
  };

  const getShowcase = () => {
    Axios.get("http://34.65.174.141:3001/Showcase").then(
      (response) => {
        setShowcaseList(response.data);
      }
    );
  };

  const getItems = () => {
    Axios.get("http://34.65.174.141:3001/Item").then(
      (response) => {
        setItemsList(response.data);
      }
    );
  };

  const getMuseum = () => {
    Axios.get("http://34.65.174.141:3001/museum").then(
      (response) => {
        setMuseumList(response.data);
      }
    );
  };

  const getBuilding = () => {
    Axios.get("http://34.65.174.141:3001/building").then(
      (response) => {
        setBuildingList(response.data);
      }
    );
  };

  const getSection = () => {
    Axios.get("http://34.65.174.141:3001/section").then(
      (response) => {
        setSectionList(response.data);
      }
    );
  };

  const getWantedList = (id, type) => {
    var wanted = "";
    var wantedItem = {};
    switch (type) {
      case "Museum":
        wantedItem = museumList.map((i) => {
          if (id === i.id) {
            wanted = i;
          }
        });
        break;

      case "Building":
        wantedItem = buildingList.map((i) => {
          if (id === i.BuildingID) {
            wanted = i;
          }
        });
        break;

      case "Section":
        wantedItem = sectionList.map((i) => {
          if (id === i.idSection) {
            wanted = i;
          }
        });
        break;

      case "Showcase":
        wantedItem = showcaseList.map((i) => {
          if (id === i.idShowcase) {
            wanted = i;
          }
        });
        break;

      case "Display":
        wantedItem = displayList.map((i) => {
          if (id === i.idDisplay) {
            wanted = i;
          }
        });
        break;

      case "Item":
        wantedItem = itemsList.map((i) => {
          if (id === i.ItemID) {
            wanted = i;
          }
        });
        break;
    }
    return wanted;
  };

  useEffect(() => {
    getDisplay();
    getShowcase();
    getItems();
    getMuseum();
    getBuilding();
    getSection();
    // eslint-disable-next-line
  }, [selectedObject]);

  const mapOptions = () => {
    return selectedObject === "Museum"
      ? museumList.map((val, key) => {
          return { value: val.id, label: val.name };
        })
      : selectedObject === "Building"
      ? buildingList.map((val, key) => {
          return { value: val.BuildingID, label: val.Name };
        })
      : selectedObject === "Section"
      ? sectionList.map((val, key) => {
          return { value: val.idSection, label: val.Name };
        })
      : selectedObject === "Display"
      ? displayList.map((val, key) => {
          console.log(val);
          return { value: val.idDisplay, label: val.Name };
        })
      : selectedObject === "Showcase"
      ? showcaseList.map((val, key) => {
          return { value: val.idShowcase, label: val.Name };
        })
      : itemsList.map((val, key) => {
          return { value: val.ItemID, label: val.ItemName };
        });
  };

  const typeOptions = [
    { value: "Museum", label: "Museum" },
    { value: "Building", label: "Building" },
    { value: "Section", label: "Section" },
    { value: "Display", label: "Display" },
    { value: "Showcase", label: "Showcase" },
    { value: "Item", label: "Item" },
  ];
  return (
    <div>
      <h2>Hello, what would you like to modify?</h2>
      <div style={contentContainerStyle}>
        <Select
          options={typeOptions}
          onChange={(e) => {
            setSelectedObject(e.value);
            setObjectName("");
            setWantedObject("");
          }}
        />
      </div>
      {selectedObject == "" ? (
        ""
      ) : (
        <div style={contentContainerStyle}>
          {selectedObject == "" ? (
            ""
          ) : (
            <Select
              value={{
                value: wantedObject,
                label:
                  objectName === "" ? "Select " + selectedObject : objectName,
              }}
              options={mapOptions()}
              onChange={(e) => {
                setWantedObject(e.value);
                setObjectName(e.label);
                getWantedList(wantedObject, selectedObject);
              }}
            />
          )}
        </div>
      )}
      {wantedObject == "" ? (
        ""
      ) : (
        <div>
          {selectedObject === "Museum" ? (
            <AddMuseum object={getWantedList(wantedObject, "Museum")} />
          ) : selectedObject === "Building" ? (
            <AddBuilding object={getWantedList(wantedObject, "Building")} />
          ) : selectedObject === "Section" ? (
            <AddSection object={getWantedList(wantedObject, "Section")} />
          ) : selectedObject === "Display" ? (
            <AddDisplay object={getWantedList(wantedObject, "Display")} />
          ) : selectedObject === "Showcase" ? (
            <AddShowcase object={getWantedList(wantedObject, "Showcase")} />
          ) : (
            <AddItem object={getWantedList(wantedObject, "Item")} />
          )}
        </div>
      )}
    </div>
  );
};

export default ModifyData;
