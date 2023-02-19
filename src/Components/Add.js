/* eslint-disable */
/**
 * Imports
 */
import React, { useState, useEffect } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddDisplay from "./Add/AddDisplay";
import AddItem from "./Add/AddItem";
import AddShowcase from "./Add/AddShowcase";
import "../App.css";
import AddMuseumBuildingSection from "./Add/AddMuseumBuildingSection";
import AddQuestion from "./Add/AddQuestion";
<head>
  <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
    rel="stylesheet"
    integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
    crossorigin="anonymous"
  ></link>
</head>;

const tabStyle = { color: "white" };

/**
 * Main add components managing all add do database
 * @returns
 */
const Add = () => {
  return (
    <div className="tb">
      <h3 style={{ color: "white", marginTop: "10px" }}>Manage Museum Data</h3>
      <Tabs>
        <TabList>
          <Tab style={tabStyle}>Museum/Building/Section</Tab>
          <Tab style={tabStyle}>Display</Tab>
          <Tab style={tabStyle}>Exibition</Tab>
          <Tab style={tabStyle}>Item</Tab>
          <Tab style={tabStyle}>Question</Tab>
        </TabList>
        <TabPanel>
          <AddMuseumBuildingSection object={null} />
        </TabPanel>
        <TabPanel>
          <AddDisplay object={null} />
        </TabPanel>
        <TabPanel>
          <AddShowcase object={null} />
        </TabPanel>
        <TabPanel>
          <AddItem object={null} />
        </TabPanel>
        <TabPanel>
          <AddQuestion object={null} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Add;
