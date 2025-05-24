import React from "react";

function RatioData({ trainRatio, testRatio, onChangeRatio, totalData = 0 }) {
  const handleChange = (e) => {
    const test = parseFloat(e.target.value); // dari desimal
    const train = 1 - test;
    onChangeRatio({ train, test });
  };

  const trainCount = Math.round(trainRatio * totalData);
  const testCount = totalData - trainCount;

  return (
    <div className="ratioData">
      <label htmlFor="ratio-select">Pilih Rasio Data:</label>
      <select
        id="ratio-select"
        onChange={handleChange}
        value={testRatio} // testRatio sekarang adalah desimal (contoh: 0.2)
      >
        <option value="0.45">55:45</option>
        <option value="0.4">60:40</option>
        <option value="0.35">65:35</option>
        <option value="0.3">70:30</option>
        <option value="0.25">75:25</option>
        <option value="0.2">80:20</option>
      </select>

      <p>Data latih: {trainCount} data</p>
      <p>Data uji : {testCount} data</p>
    </div>
  );
}

export default RatioData;
