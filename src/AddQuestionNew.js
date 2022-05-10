import React from 'react'
import AddQuestion from './Components/Add/AddQuestion'
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const AddQuestionNew = (props) => {
      const params = useParams();
        const[itemName,setItemName]=useState("")
  const [id, setId] = useState("");
  useEffect(() => {
      
    setId(params.id);
    
   getItem()
    

    // eslint-disable-next-line
  }, [props]);

 const getItem = async () => {
    try {
      let res = await Axios.get(
        `http://35.240.85.175:3001/Item/${params.id}`
      );
     setItemName(res.data[0].ItemName)
    } catch (error) {
      console.log(error.data);
    }
  };
    
  
  return (
    <div className="pshDwn" style={{textAlign: "center"}}>
        <AddQuestion itemName={itemName} itemId={id}></AddQuestion>
    </div>
  )
}

export default AddQuestionNew
