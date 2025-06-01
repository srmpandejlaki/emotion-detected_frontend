import React, { useRef } from 'react';
import Papa from 'papaparse';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InputCSV = ({ onDataParsed }) => {
  const inputRef = useRef(null);

  const validEmotions = {
    joy: 'joy',
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

        const parsedData = raw
          .map((row, index) => ({
            id: index + 1,
            text: row.text?.trim() || '',
            emotion: validEmotions[row.emotion?.toLowerCase().trim()] || '',
          }))
          .filter((item) => item.text !== '' && item.emotion !== '');

        const emotionCounts = parsedData.reduce((acc, item) => {
          acc[item.emotion] = (acc[item.emotion] || 0) + 1;
          return acc;
        }, {});

        const missingEmotions = Object.keys(validEmotions).filter(
          (emotion) => !emotionCounts[emotion]
        );

        // Reset input value to allow re-upload of the same file
        if (inputRef.current) {
          inputRef.current.value = '';
        }

        if (missingEmotions.length > 0) {
          toast.error(
            `Emosi berikut tidak memiliki data: ${missingEmotions.join(', ')}`,
            { position: 'top-right' }
          );
          return;
        }

        onDataParsed(parsedData);
      },
    });
  };

  return (
    <div className='input-csv'>
      <h2>Upload CSV File</h2>
      <input
        type='file'
        accept='.csv'
        onChange={handleFileUpload}
        ref={inputRef}
      />
      <ToastContainer />
    </div>
  );
};

export default InputCSV;
