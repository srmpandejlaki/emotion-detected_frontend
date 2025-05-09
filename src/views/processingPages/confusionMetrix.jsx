import React from 'react';

function MetrixPage() {
  // Contoh data dummy hasil processing
  const metrics = {
    accuracy: 0.83,
    precision: {
      marah: 0.81,
      senang: 0.87,
      sedih: 0.79,
      takut: 0.85,
    },
    recall: {
      marah: 0.78,
      senang: 0.89,
      sedih: 0.76,
      takut: 0.82,
    },
    confusionMatrix: [
      ['-', 'Marah', 'Senang', 'Sedih', 'Takut'],
      ['Marah', 44, 4, 2, 0],
      ['Senang', 3, 46, 2, 1],
      ['Sedih', 4, 3, 42, 1],
      ['Takut', 0, 2, 2, 46],
    ],
  };

  const labels = Object.keys(metrics.precision);

  return (
    <div className="metrics-page">
      <h1 className="title">Evaluasi Model (Processing Result)</h1>

      <div className="section">
        <h2 className="section-title">Akurasi</h2>
        <p className="value">{(metrics.accuracy * 100).toFixed(2)}%</p>
      </div>

      <div className="container-matrics">
        <div className="section">
          <h2 className="section-title">Precision & Recall per Emosi</h2>
          <table className="metrics-table">
            <thead>
              <tr>
                <th>Label</th>
                <th>Precision</th>
                <th>Recall</th>
              </tr>
            </thead>
            <tbody>
              {labels.map((label) => (
                <tr key={label}>
                  <td>{label}</td>
                  <td>{(metrics.precision[label] * 100).toFixed(2)}%</td>
                  <td>{(metrics.recall[label] * 100).toFixed(2)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="section">
          <h2 className="section-title">Confusion Matrix</h2>
          <table className="confusion-table">
            <tbody>
              {metrics.confusionMatrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={`confusion-cell ${
                        rowIndex === 0 || colIndex === 0 ? 'header-cell' : ''
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MetrixPage;
