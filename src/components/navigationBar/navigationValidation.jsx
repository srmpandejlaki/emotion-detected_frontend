import React from 'react';
import { Link } from "react-router-dom";

function NavValidation() {
  return (
    <div className="navValidation">
      <Link to="/validation" className="navItem">Dataset</Link>
      <Link to="/validation/matrics" className="navItem">Class Matrics</Link>
    </div>
  );
};

export default NavValidation;