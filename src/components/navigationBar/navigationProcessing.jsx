import React from 'react';
import { Link } from "react-router-dom";

function NavProcessing() {
  return (
    <div className="navProcessing">
      <Link to="/processing" className="navItem">Home</Link>
      <Link to="/processing/prob-prior" className="navItem">Probabilitas Prior</Link>
      <Link to="/processing/prob-kondisi" className="navItem">Probabilitas Kondisi</Link>
      <Link to="/processing/confusion-metrix" className="navItem">Confusion Matrix</Link>
      <Link to="/processing/class-matrics" className="navItem">Accuracy, Precision, Recall</Link>
    </div>
  );
};

export default NavProcessing;