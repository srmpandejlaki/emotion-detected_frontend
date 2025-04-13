import React from "react";
import NavBar from "../navigationBar/navigationBar";
import FooterBar from "../footerBar";

function SideContainer() {
  return (
    <div className="sideContainer">
      <NavBar></NavBar>
      <FooterBar></FooterBar>
    </div>
  );
};

export default SideContainer;