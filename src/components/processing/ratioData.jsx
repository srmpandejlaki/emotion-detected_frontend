import React from "react";

function RatioData({ trainRatio, testRatio, onChangeRatio }) {
  const handleChange = (e) => {
    const value = e.target.value;
    const [train, test] = value.split(":").map(Number);
    onChangeRatio({ train, test });
  };

  return (
    <div className="ratioData">
      <label htmlFor="ratio-select">Pilih Rasio Data:</label>
      <select id="ratio-select" onChange={handleChange} value={`${trainRatio}:${testRatio}`}>
        <option value="60:40">60:40</option>
        <option value="70:30">70:30</option>
        <option value="80:20">80:20</option>
      </select>
      <p>Data training: {trainRatio}%</p>
      <p>Data testing : {testRatio}%</p>
    </div>
  );
}

export default RatioData;
