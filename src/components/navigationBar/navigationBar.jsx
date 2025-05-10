import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <div className="navBar">
      <Link to="/" className="navItems">Klasifikasi</Link>
      <Link to="/dataset" className="navItems">Data dari Database</Link>
      <Link to="/preprocessing" className="navItems">Pra-Pemrosesan</Link>
      <Link to="/processing" className="navItems">Pemrosesan</Link>
      <Link to="/validation" className="navItems">Validasi Model</Link>
    </div>
  )
};

export default NavBar;