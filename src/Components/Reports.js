import React from "react";
import { useState, useEffect } from "react";
import Select from "react-select";
import Axios from "axios";

const contentContainerStyle = {
  display: "block",
  marginLeft: "5%",
  marginTop: "15px",
  marginBottom: "15px",
  justifyContent: "center", //Centered vertically
  alignItems: "center", // Centered horizontally
  flex: 1,
  width: "20%",
};

const Reports = () => {
  const [selectedObject, setSelectedObject] = useState("");
  const [displayList, setDisplayList] = useState([]);
  const [showcaseList, setShowcaseList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [museumList, setMuseumList] = useState([]);
  const [buildingList, setBuildingList] = useState([]);
  const [sectionList, setSectionList] = useState([]);

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

  useEffect(() => {
    getDisplay();
    getShowcase();
    getItems();
    getMuseum();
    getBuilding();
    getSection();
    // eslint-disable-next-line
  }, []);

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
      <h2>Reports</h2>
      <div style={contentContainerStyle}>
        <Select
          options={typeOptions}
          onChange={(e) => {
            setSelectedObject(e.value);
          }}
        />
      </div>
    </div>
  );
};

export default Reports;
