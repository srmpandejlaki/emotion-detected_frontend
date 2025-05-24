import React, { useState, useEffect } from 'react';
import { getModelEvaluation } from '../../utils/api/processing';

function MatricsValidationPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await getModelEvaluation();
        console.log('Metrics Response:', response);

        setMetrics(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div className='metrics-page'>Loading metrics...</div>;
  }

  if (error) {
    return <div className='metrics-page'>Error: {error}</div>;
  }

  if (!metrics) {
    return <div className='metrics-page'>No metrics data available</div>;
  }

  // Format confusion matrix dengan label
  const emotionLabels = Object.keys(metrics.classification_report).filter(
    (label) => !['macro avg', 'weighted avg', 'accuracy'].includes(label)
  );

  const formattedConfusionMatrix = [
    ['-', ...emotionLabels],
    ...metrics.confusion_matrix.map((row, i) => [emotionLabels[i], ...row]),
  ];

  return (
    <div className='metrics-page'>
      <h1 className='title'>Evaluasi Model (Validation Result)</h1>
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
            <h2 className='section-title'>Akurasi</h2>
            <p className='value'>{(metrics.accuracy * 100).toFixed(2)}%</p>
          </div>
          <div className='section'>
            <h2 className='section-title'>Precision & Recall per Emosi</h2>
            <table className='metrics-table'>
              <thead>
                <tr>
                  <th>Label</th>
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
}

export default MatricsValidationPage;
