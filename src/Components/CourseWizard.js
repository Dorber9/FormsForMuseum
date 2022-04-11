/* eslint-disable */
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "@material-ui/core/Button";
import AddCourse from "./Add/AddCourse";
import ModifyCourse from "./Modify/ModifyCourse";

const tabStyle= {color: "white"}


const CourseWizard = () => {
  return (
    <div className="tb">
      <h1 style={tabStyle}>Manage Quests</h1>
      <Tabs>
        <TabList>
          <Tab style={tabStyle}>Add</Tab>
          <Tab style={tabStyle}>Modify</Tab>
        </TabList>

        <TabPanel>
          
          <AddCourse />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "center" }}>Modify Quest</h2>
          <ModifyCourse />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CourseWizard;
