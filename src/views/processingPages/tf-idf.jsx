import React, { useEffect, useState } from 'react';
import { fetchTfidfStats, getModels } from '../../utils/api/processing';

function TfIdfPage() {
  const [tfidfData, setTfidfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modelId, setModelId] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (modelIdToUse, pageToLoad = 1) => {
    setLoading(true);
    const tfidfRes = await fetchTfidfStats(modelIdToUse, pageToLoad);
    if (!tfidfRes.error && tfidfRes.data) {
      setTfidfData(tfidfRes.data);
      setTotalPages(tfidfRes.total_pages);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadModelAndTfidf = async () => {
      const modelRes = await getModels();
      if (!modelRes.error && modelRes.data.length > 0) {
        const latestModel = modelRes.data[modelRes.data.length - 1];
        setModelId(latestModel.id);
        await loadData(latestModel.id, 1);
      }
    };

    loadModelAndTfidf();
  }, []);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    loadData(modelId, newPage);
  };

  return (
    <div>
      <h2>Statistik TF-IDF</h2>
      {loading ? (
        <p>Memuat data...</p>
      ) : tfidfData.length === 0 ? (
        <p>Tidak ada data TF-IDF tersedia.</p>
      ) : (
        <>
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
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{item.word}</td>
                  <td>{item.tf.toFixed(4)}</td>
                  <td>{item.idf.toFixed(4)}</td>
                  <td>{item.tfidf.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem' }}>
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page <= 1}
            >
              Prev
            </button>
            <span style={{ margin: '0 10px' }}>
              Halaman {page} dari {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default TfIdfPage;
