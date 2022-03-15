import React from 'react'
import { useState, useEffect } from "react";
import QRCode from 'react-qr-code';
import { useParams } from 'react-router-dom';
import ViewItemWiki from './ViewItemWiki ';



const ViewItemNewPage = (props) => {
    const params=useParams()
    const [id,setId]= useState("");
      useEffect(() => {
         setId(params.id)
        
      
    // eslint-disable-next-line
    }, [id]);
  return (
    <div>
        <QRCode value={`${window.location.href}`} size="150" />
        <br></br>
        <ViewItemWiki itemId={id}> </ViewItemWiki>
    </div>
  )
}

export default ViewItemNewPage