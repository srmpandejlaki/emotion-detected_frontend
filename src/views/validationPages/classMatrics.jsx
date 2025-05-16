import React from 'react';

function MatricsValidationPage() {
  // Contoh data dummy untuk ditampilkan
  const metrics = {
    accuracy: 0.85,
    precision: {
      marah: 0.82,
      senang: 0.88,
      sedih: 0.81,
      takut: 0.84,
    },
    recall: {
      marah: 0.80,
      senang: 0.90,
      sedih: 0.78,
      takut: 0.83,
    },
    confusionMatrix: [
      ['-', 'Marah', 'Senang', 'Sedih', 'Takut'],
      ['Marah', 45, 3, 2, 0],
      ['Senang', 2, 47, 1, 0],
      ['Sedih', 3, 2, 43, 2],
      ['Takut', 0, 1, 3, 46],
    ],
  };

  const labels = Object.keys(metrics.precision);

  return (
    <div className="metrics-page">
      <h1 className="title">Evaluasi Model (Validation Result)</h1>
      <div className="container2">
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
        
        <div className="container-matrics">
          <div className="section">
            <h2 className="section-title">Akurasi</h2>
            <p className="value">{(metrics.accuracy * 100).toFixed(2)}%</p>
          </div>
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
        </div>
      </div>
    </div>
  );
}

export default MatricsValidationPage;
