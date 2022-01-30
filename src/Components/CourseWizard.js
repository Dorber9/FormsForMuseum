import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Button from "@material-ui/core/Button";
import AddCourse from "./Add/AddCourse";
import ModifyCourse from "./Modify/ModifyCourse";

const CourseWizard = () => {
  return (
    <div>
      <h1>Manage Museum Data</h1>
      <Tabs>
        <TabList>
          <Tab>Add</Tab>
          <Tab>Modify</Tab>
        </TabList>

        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Add New Course</h2>
          <AddCourse />
        </TabPanel>
        <TabPanel>
          <h2 style={{ textAlign: "left" }}>Modify Course</h2>
          <ModifyCourse />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default CourseWizard;
