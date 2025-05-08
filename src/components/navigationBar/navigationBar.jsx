import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBar">
      <Link to="/dataset" className="navItems">Data Collection</Link>
      <Link to="/preprocessing" className="navItems">Preprocessing</Link>
      <Link to="/processing" className="navItems">Processing</Link>
      <Link to="/validation" className="navItems">Validation</Link>
      <Link to="/" className="navItems">Classification</Link>
    </div>
  )
};

export default NavBar;