import React, { useEffect, useState } from 'react';
import { fetchProbCondition, getModels } from '../../utils/api/processing';

function KondisiPage() {
  const [data, setData] = useState([]);
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

  // Ambil probabilitas kondisi setelah modelId ada
  useEffect(() => {
    const loadProbCondition = async () => {
      if (!modelId) return;

      setLoading(true);
      setError(null);
      const result = await fetchProbCondition(modelId);
      if (!result.error) {
        if (Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data);
        } else {
          setData([]);
          setError("Data probabilitas kondisi kosong");
        }
      } else {
        setError("Gagal mengambil data probabilitas kondisi");
      }
      setLoading(false);
    };
    loadProbCondition();
  }, [modelId]);

  return (
    <div className="kondisi-page">
      <h1>Probabilitas Kondisi</h1>
      {loading && <p>Memuat data...</p>}
      {!loading && error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && data.length === 0 && (
        <p>Data tidak tersedia</p>
      )}
      {!loading && !error && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Teks</th>
              <th>Probabilitas Emosi</th>
              <th>Prediksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={item.id}>
                <td>{idx + 1}</td>
                <td>{item.teks}</td>
                <td>
                  {Object.entries(item.probabilitas).map(([emosi, nilai]) => (
                    <div key={emosi}>
                      <strong>{emosi}</strong>: {Number(nilai).toFixed(2)}
                    </div>
                  ))}
                </td>
                <td>{item.prediksi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default KondisiPage;
