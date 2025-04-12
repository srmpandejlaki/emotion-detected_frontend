import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBar">
      <Link to="/dataCollection">Data Collection</Link>
      <Link to="/preprocessing">Preprocessing</Link>
      <Link to="/processing">Processing</Link>
      <Link to="/validation">Validation</Link>
    </div>
  )
};

export default NavBar;