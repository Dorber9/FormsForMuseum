/* eslint-disable */
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "@material-ui/core/Button";
import AddCourse from "./Add/AddCourse";
import ModifyCourse from "./Modify/ModifyCourse";
import ListOfCourses from "./ListOfCourses";

const tabStyle = { color: "white" };

const CourseWizard = () => {
  return (
    <div className="tb">
      <h1 style={tabStyle}>Manage Quests</h1>
      <Tabs>
        <TabList>
          <Tab style={tabStyle}>Add</Tab>
          <Tab style={tabStyle}>Modify</Tab>
          <Tab style={tabStyle}>Demo</Tab>
        </TabList>

        <TabPanel>
          <AddCourse />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "center", color: "white" }}>Modify Quest</h2>
          <ModifyCourse />
        </TabPanel>
        <TabPanel>
          <ListOfCourses></ListOfCourses>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CourseWizard;
