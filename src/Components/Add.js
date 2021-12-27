import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import AddMuseum from "./Add/AddMuseum";
import AddBuilding from "./Add/AddBuilding";
import AddDisplay from "./Add/AddDisplay";
import AddItem from "./Add/AddItem";
import AddShowcase from "./Add/AddShowcase";
import AddSection from "./Add/AddSection";

const Add = () => {
  return (
    <div>
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
          <AddMuseum />
        </TabPanel>
        <TabPanel>
          <AddBuilding />
        </TabPanel>
        <TabPanel>
          <AddSection />
        </TabPanel>
        <TabPanel>
          <AddDisplay />
        </TabPanel>
        <TabPanel>
          <AddShowcase />
        </TabPanel>
        <TabPanel>
          <AddItem />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default Add;
