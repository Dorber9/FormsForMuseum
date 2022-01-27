import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddMuseum from "./Add/AddMuseum";
import AddBuilding from "./Add/AddBuilding";
import AddDisplay from "./Add/AddDisplay";
import AddItem from "./Add/AddItem";
import AddShowcase from "./Add/AddShowcase";
import AddSection from "./Add/AddSection";
import "../App.css";
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
          <Tab>Museum</Tab>
          <Tab>Building</Tab>
          <Tab>Section</Tab>
          <Tab>Display</Tab>
          <Tab>Showcase</Tab>
          <Tab>Item</Tab>
        </TabList>

        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add Museum</h2>
          <AddMuseum />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add Building</h2>
          <AddBuilding />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add Section</h2>
          <AddSection />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add Display</h2>
          <AddDisplay />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add Showcase</h2>
          <AddShowcase />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add New Item</h2>
          <AddItem />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Add;
