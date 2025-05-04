import React from "react";

function RatioData({ trainRatio, testRatio }) {
  return (
    <div className="ratioData">
      <p>Data Training: {trainRatio}%</p>
      <p>Data Testing: {testRatio}%</p>
    </div>
  );
};

export default RatioData;
