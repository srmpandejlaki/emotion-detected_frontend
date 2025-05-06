import React from 'react';
import { Link } from "react-router-dom";

function NavValidation() {
  return (
    <div className="navValidation">
      <Link to="/validation" className="navItem">Home</Link>
      <Link to="/validation/metrix" className="navItem">Confusion Matrix</Link>
      <Link to="/validation/matrics" className="navItem">Accuracy, Precision, Recall</Link>
    </div>
  );
};

export default NavValidation;