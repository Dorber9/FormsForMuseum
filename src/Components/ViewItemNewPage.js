/* eslint-disable */
import React from "react";
import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import ViewItemWiki from "./ViewItemWiki ";

const ViewItemNewPage = (props) => {
  const params = useParams();
  // useEffect(() => {
  //   setId(params.id);

  //   // eslint-disable-next-line
  // }, []);
  return (
    <div>
      <br></br>
      <ViewItemWiki itemId={params.id}> </ViewItemWiki>
    </div>
  );
};

export default ViewItemNewPage;
