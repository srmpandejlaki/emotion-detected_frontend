import React, { useEffect, useState } from 'react';
import { getModels, fetchProbPrior } from '../../utils/api/processing';

function PriorPage() {
  const [priorData, setPriorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modelId, setModelId] = useState(null);

  // Ambil model terakhir
  useEffect(() => {
    const loadLatestModel = async () => {
      setLoading(true);
      setError(null);
      const result = await getModels();
      if (!result.error && result.data.length > 0) {
        const latestModel = result.data[result.data.length - 1];
        setModelId(latestModel.id);
      } else {
        setError("Model tidak ditemukan");
        setLoading(false);
      }
    };
    loadLatestModel();
  }, []);

  // Ambil prior probabilities dari endpoint fetchProbPrior
  useEffect(() => {
    const loadPriorData = async () => {
      if (!modelId) return;

      setLoading(true);
      setError(null);
      const result = await fetchProbPrior(modelId);
      if (!result.error && result.data) {
        setPriorData(result.data); // result.data adalah objek seperti { senang: {...}, marah: {...} }
      } else {
        setError("Probabilitas prior tidak ditemukan");
      }
      setLoading(false);
    };
    loadPriorData();
  }, [modelId]);

  const renderData = Object.entries(priorData).map(([emotion, stats]) => ({
    emotion,
    ...stats
  }));

  return (
    <div className="section prior-page">
      <h1>Probabilitas Prior</h1>
      {loading && <p>Memuat data...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && renderData.length === 0 && <p>Data kosong</p>}
      {!loading && !error && renderData.length > 0 && (
        <table className="prior-table">
          <thead>
            <tr>
              <th>Emosi</th>
              <th>Jumlah Data</th>
              <th>Probabilitas Prior</th>
            </tr>
          </thead>
          <tbody>
            {renderData.map((item) => (
              <tr key={item.emotion}>
                <td>{item.emotion}</td>
                <td>{item.count}</td>
                <td>{Number(item.probability).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PriorPage;
