import React from 'react';
import { Link } from "react-router-dom";

function NavProcessing() {
  return (
    <div className="navProcessing">
      <Link to="/processing">Home</Link>
      <Link to="/prob-prior">Probabilitas Prior</Link>
      <Link to="/prob-kondisi">Probabilitas Kondisi</Link>
      <Link to="/prob-kondisi">Accuracy, Precision, Recall</Link>
      <Link to="/prob-kondisi">Confusion Matrix</Link>
    </div>
  );
};

export default NavProcessing;