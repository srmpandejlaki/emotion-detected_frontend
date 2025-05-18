import React, { useEffect, useState } from 'react';
import { getModels, getModelEvaluation } from '../../utils/api/processing';

function MetrixPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchLatestModelAndEvaluation = async () => {
      try {
        const modelsResult = await getModels();

        if (modelsResult.error || !modelsResult.data.length) {
          setError(true);
          setLoading(false);
          return;
        }

        // Ambil model terakhir dari daftar
        const latestModel = modelsResult.data[modelsResult.data.length - 1];
        const modelId = latestModel.id;

        const evaluationResult = await getModelEvaluation(modelId);
        if (evaluationResult.error) {
          setError(true);
        } else {
          setMetrics(evaluationResult.data);
        }
      } catch (e) {
        console.error("Terjadi kesalahan saat mengambil evaluasi model:", e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestModelAndEvaluation();
  }, []);

  if (loading) return <p>Memuat evaluasi model...</p>;
  if (error || !metrics) return <p>Gagal memuat data evaluasi model.</p>;

  const labels = Object.keys(metrics.precision);

  return (
    <div className="metrics-page">
      <h1 className="title">Evaluasi Model (Validation Result)</h1>
      <div className="container2">
        <div className="section">
          <h2 className="section-title">Confusion Matrix</h2>
          <table className="confusion-table">
            <tbody>
              {metrics.confusion_matrix.map((row, rowIndex) => (
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

export default MetrixPage;
