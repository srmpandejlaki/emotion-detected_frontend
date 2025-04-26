import React from 'react';
import { Link } from "react-router-dom";

function NavProcessing() {
  return (
    <div className="navProcessing">
      <Link to="/processing" className="navItem">Home</Link>
      <Link to="/prob-prior" className="navItem">Probabilitas Prior</Link>
      <Link to="/prob-kondisi" className="navItem">Probabilitas Kondisi</Link>
      <Link to="/class-matrics" className="navItem">Accuracy, Precision, Recall</Link>
      <Link to="/confusion-metrix" className="navItem">Confusion Matrix</Link>
    </div>
  );
};

export default NavProcessing;