import React from 'react';

const MatricsValidationPage = ({ data }) => {
  if (!data) return <p>Belum ada data evaluasi</p>;

  const metrics = data;
  const emotionLabels = Object.keys(metrics.classification_report).filter(
    (label) => !["accuracy", "macro avg", "weighted avg"].includes(label)
  );

  // Tambahkan header ke confusion matrix
  const labels = emotionLabels;
  const formattedConfusionMatrix = [
    ["", ...labels],
    ...metrics.confusion_matrix.map((row, i) => [labels[i], ...row]),
  ];

  return (
    <div className='metrics-page'>
      <h1 className='title'>Evaluasi Model (Hasil Pemrosesan)</h1>
      <div className='container2'>
        <div className='section'>
          <h2 className='section-title'>Confusion Matrix</h2>
          <table className='confusion-table'>
            <tbody>
              {formattedConfusionMatrix.map((row, rowIndex) => (
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

        <div className='container-matrics'>
          <div className='section'>
            <div className='setting'>
              <h2 className='section-title'>Akurasi</h2>
              <p>{(metrics.accuracy * 100).toFixed(2)}%</p>
            </div>
            <h2 className='section-title'>Precision & Recall per Emosi</h2>
            <table className='metrics-table'>
              <thead>
                <tr>
                  <th>Emosi</th>
                  <th>Precision</th>
                  <th>Recall</th>
                  <th>F1-Score</th>
                  <th>Support</th>
                </tr>
              </thead>
              <tbody>
                {emotionLabels.map((label) => {
                  const report = metrics.classification_report[label];
                  return (
                    <tr key={label}>
                      <td>{label}</td>
                      <td>{(report.precision * 100).toFixed(2)}%</td>
                      <td>{(report.recall * 100).toFixed(2)}%</td>
                      <td>{(report['f1-score'] * 100).toFixed(2)}%</td>
                      <td>{report.support}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatricsValidationPage;
