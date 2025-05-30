import React from 'react';

function RatioData({ testRatio, onChangeRatio, trainCount, testCount }) {
  const handleChange = (e) => {
    const newTestRatio = parseFloat(e.target.value);
    onChangeRatio(newTestRatio);
  };

  return (
    <div className='ratioData'>
      <label htmlFor='ratio-select'>Pilih Rasio Data:</label>
      <select id='ratio-select' onChange={handleChange} value={testRatio}>
        {/* disbled option */}
        <option value='0' disabled>
          Pilih rasio data
        </option>
        <option value='0.5'>50:50</option>
        <option value='0.45'>55:45</option>
        <option value='0.4'>60:40</option>
        <option value='0.35'>65:35</option>
        <option value='0.3'>70:30</option>
        <option value='0.25'>75:25</option>
        <option value='0.2'>80:20</option>
      </select>

      <div className='count-summary'>
        <p>Data latih: {trainCount} data</p>
        <p>Data uji : {testCount} data</p>
      </div>
    </div>
  );
}

export default RatioData;
