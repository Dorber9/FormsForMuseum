// Import React and necessary modules
import React from "react";
import AddQuestion from "./Components/Add/AddQuestion";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

// Define the AddQuestionNew component and pass props as a parameter
const AddQuestionNew = (props) => {
  // Use the useParams hook to extract the parameters from the URL
  const params = useParams();

  // Define two state variables using the useState hook
  const [itemName, setItemName] = useState("");
  const [id, setId] = useState("");

  // Define an effect using the useEffect hook
  useEffect(() => {
    // Set the id state variable to the value of params.id
    setId(params.id);

    // Call the getItem function
    getItem();

    // Disable eslint warning for props dependency
    // eslint-disable-next-line
  }, [props]);

  // Define the getItem function as an asynchronous function
  const getItem = async () => {
    try {
      // Use Axios to make a GET request to the specified endpoint
      let res = await Axios.get(`http://34.165.154.8:3001/Item/${params.id}`);

      // Set the itemName state variable to the value of the first item in the response data array
      setItemName(res.data[0].ItemName);
    } catch (error) {
      // Log any errors to the console
      console.log(error.data);
    }
  };

  // Return the component JSX
  return (
    <div className="pshDwn" style={{ textAlign: "center" }}>
      <AddQuestion itemName={itemName} itemId={id}></AddQuestion>
    </div>
  );
};

// Export the AddQuestionNew component as the default export
export default AddQuestionNew;
