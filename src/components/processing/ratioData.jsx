import React from "react";

function RatioData({ trainRatio, testRatio, onChangeRatio, totalData = 0 }) {
  const handleChange = (e) => {
    const value = e.target.value;
    const [train, test] = value.split(":").map(Number);
    onChangeRatio({ train, test });
  };

  // Hitung total data latih dan uji berdasarkan total data
  const trainCount = Math.round((trainRatio / 100) * totalData);
  const testCount = totalData - trainCount;

  return (
    <div className="ratioData">
      <label htmlFor="ratio-select">Pilih Rasio Data:</label>
      <select id="ratio-select" onChange={handleChange} value={`${trainRatio}:${testRatio}`}>
        <option value="55:45">55:45</option>
        <option value="60:40">60:40</option>
        <option value="65:35">65:35</option>
        <option value="70:30">70:30</option>
        <option value="75:25">75:25</option>
        <option value="80:20">80:20</option>
      </select>

      <p>Data latih: {trainCount} data</p>
      <p>Data uji : {testCount} data</p>
    </div>
  );
}

export default RatioData;
