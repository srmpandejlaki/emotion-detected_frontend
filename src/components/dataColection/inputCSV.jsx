// UploadCSV.js
import React from 'react';
import Papa from 'papaparse';

const InputCSV = ({ onDataParsed }) => {
  const validEmotions = {
    joy: 'senang',
    trust: 'trust',
    shock: 'shock',
    netral: 'netral',
    fear: 'fear',
    sadness: 'sadness',
    anger: 'anger',
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim().toLowerCase(),
      complete: (results) => {
        const raw = results.data;

        const parsedData = raw.map((row, index) => ({
          id: index + 1,
          text: row.text?.trim() || '',
          emotion: validEmotions[row.emotion?.toLowerCase().trim()] || '',
        })).filter(item => item.text !== '');

        onDataParsed(parsedData);
      },
    });
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default InputCSV;
