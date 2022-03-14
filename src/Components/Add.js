/* eslint-disable */
import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddMuseum from "./Add/AddMuseum";
import AddBuilding from "./Add/AddBuilding";
import AddDisplay from "./Add/AddDisplay";
import AddItem from "./Add/AddItem";
import AddShowcase from "./Add/AddShowcase";
import AddSection from "./Add/AddSection";
import Header from "./Header";
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

const Add = () => {
  return (
    <div className="tb">
      <h1>Manage Museum Data</h1>
      <Tabs>
        <TabList>
          {/* <Tab>Museum</Tab> */}
          <Tab>Museum/Building/Section</Tab>
          {/* <Tab>Building</Tab> */}
          {/* <Tab>Section</Tab> */}
          <Tab>Display</Tab>
          <Tab>Exibition</Tab>
          <Tab>Item</Tab>
          <Tab>Question</Tab>
        </TabList>

        {/* <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Museum</h2>
          <AddMuseum object={null} />
        </TabPanel> */}
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Museum/Building/Section</h2>
          <AddMuseumBuildingSection object={null} />
        </TabPanel>
        {/* <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Building</h2>
          <AddBuilding object={null} />
        </TabPanel> */}
        {/* <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Section</h2>
          <AddSection object={null} />
        </TabPanel> */}
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Display</h2>
          <AddDisplay object={null} />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add Exibition</h2>
          <AddShowcase object={null} />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add New Item</h2>
          <AddItem object={null} />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Add New Question</h2>
          <AddQuestion object={null} />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Add;