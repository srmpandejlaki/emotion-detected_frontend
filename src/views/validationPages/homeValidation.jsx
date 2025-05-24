import React, { useEffect, useState } from 'react';
import { fetchPredictResults } from '../../utils/api/processing'; // sesuaikan path-nya kalau berbeda
import NewPagination from '../../components/base/NewPagination';

function HomeValidationPage() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (pageToLoad = 1) => {
    setLoading(true);
    const predictRes = await fetchPredictResults(pageToLoad);
    console.log('Prediction Results Response:', predictRes);
    if (!predictRes.error && predictRes.data) {
      setResults(predictRes.data.data);
      setTotalPages(predictRes.data.total_pages);
      setPage(predictRes.data.current_page);
    }
    setLoading(false);
  };

  useEffect(() => {
    const loadResults = async () => {
      await loadData(1);
    };

    loadResults();
  }, []);

  const handlePageChange = (newPage) => {
    loadData(newPage);
  };

  if (results.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Prediction Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : results.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <>
          <table border='1' cellPadding='8' style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th>No</th>
                <th>Text</th>
                <th>Actual Label</th>
                <th>Predicted Label</th>
                <th>Prediction Source</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={index}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{item.text}</td>
                  <td>{item.true_label}</td>
                  <td>{item.predicted_label}</td>
                  <td>{item.pred_source}</td>
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

export default HomeValidationPage;
