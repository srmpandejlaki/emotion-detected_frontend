import React, { useEffect, useState } from 'react';
import { fetchTfidfStats, getModels } from '../../utils/api/processing'; // pastikan path benar

function TfIdfPage() {
  const [tfidfData, setTfidfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelId, setModelId] = useState(null);

  useEffect(() => {
    // Ambil model terakhir
    const loadModelAndTfidf = async () => {
      setLoading(true);
      const modelRes = await getModels();
      if (!modelRes.error && modelRes.data.length > 0) {
        const latestModel = modelRes.data[modelRes.data.length - 1];
        setModelId(latestModel.id);

        const tfidfRes = await fetchTfidfStats(latestModel.id);
        if (!tfidfRes.error && tfidfRes.data) {
          setTfidfData(tfidfRes.data); // Pastikan backend mengirim dalam format list
        }
      }
      setLoading(false);
    };

    loadModelAndTfidf();
  }, []);

  return (
    <div>
      <h2>TF-IDF Statistics</h2>
      {loading ? (
        <p>Loading...</p>
      ) : tfidfData.length === 0 ? (
        <p>Tidak ada data TF-IDF tersedia.</p>
      ) : (
        <div className="tabel">
          <table border="1" cellPadding="6">
            <thead>
              <tr>
                <th>No</th>
                <th>Kata</th>
                <th>TF</th>
                <th>IDF</th>
                <th>TF-IDF</th>
              </tr>
            </thead>
            <tbody>
              {tfidfData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.word}</td>
                  <td>{item.tf.toFixed(4)}</td>
                  <td>{item.idf.toFixed(4)}</td>
                  <td>{item.tfidf.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default TfIdfPage;
