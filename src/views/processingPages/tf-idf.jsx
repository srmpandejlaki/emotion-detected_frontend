import React, { useEffect, useState } from 'react';
import { fetchTfidfStats } from '../../utils/api/processing';
import NewPagination from '../../components/base/NewPagination';

function TfIdfPage() {
  const [tfidfData, setTfidfData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (pageToLoad = 1) => {
    setLoading(true);
    const tfidfRes = await fetchTfidfStats(pageToLoad);
    if (!tfidfRes.error && tfidfRes.data) {
      setTfidfData(tfidfRes.data);
      setTotalPages(tfidfRes.total_pages);
      setPage(tfidfRes.current_page);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadModelAndTfidf = async () => {
      await loadData(1, 10);
    };

    loadModelAndTfidf();
  }, []);

  const handlePageChange = (newPage) => {
    loadData(newPage);
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
          <table border='1' cellPadding='6'>
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
                  <td>{item.kata}</td>
                  <td>{item.tf.toFixed(4)}</td>
                  <td>{item.idf.toFixed(4)}</td>
                  <td>{item.tfidf.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <NewPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
}

export default TfIdfPage;
