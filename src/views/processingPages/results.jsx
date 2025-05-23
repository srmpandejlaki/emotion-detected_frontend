import React, { useEffect, useState, useCallback } from 'react';
import { getModels } from '../../utils/api/processing'; // sesuaikan path-nya kalau berbeda

const ResultPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getResults = useCallback(async () => {
    setLoading(true);
    const response = await getModels();
    console.log(response);
    if (!response.error) {
      setResults(response.data.models);
    } else {
      setResults([]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // console.log("modelId: ", modelId);
    getResults();
  }, []);

  if (results.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Prediction Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <table
          border="1"
          cellPadding="8"
          style={{ borderCollapse: 'collapse', width: '100%' }}
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Text</th>
              <th>True Label</th>
              <th>Predicted Label</th>
              <th>Prediction Source</th>
            </tr>
          </thead>
          <tbody>
            {results.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.text}</td>
                <td>{item.true_label}</td>
                <td>{item.predicted_label}</td>
                <td>{item.pred_source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ResultPage;
