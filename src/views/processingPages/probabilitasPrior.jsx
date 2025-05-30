import React, { useEffect, useState } from 'react';
import { fetchProbPrior } from '../../utils/api/processing';

function PriorPage() {
  const [priorData, setPriorData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Ambil prior probabilities dari endpoint fetchProbPrior
  useEffect(() => {
    const loadPriorData = async () => {
      setLoading(true);
      setError(null);
      const result = await fetchProbPrior();
      if (!result.error && result.data) {
        setPriorData(result.data); // result.data adalah objek seperti { senang: {...}, marah: {...} }
      } else {
        setError('Probabilitas prior tidak ditemukan');
      }
      setLoading(false);
    };
    loadPriorData();
  }, []);

  const renderData = Object.entries(priorData).map(([emotion, stats]) => ({
    emotion,
    ...stats,
  }));

  return (
    <div className='section prior-page'>
      <h1>Probabilitas Prior</h1>
      {loading && <p>Memuat data...</p>}
      {!loading && error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && renderData.length === 0 && <p>Data kosong</p>}
      {!loading && !error && renderData.length > 0 && (
        <table className='prior-table'>
          <thead>
            <tr>
              <th>Emosi</th>
              <th>Jumlah Data</th>
              <th>Probabilitas Prior</th>
            </tr>
          </thead>
          <tbody>
            {renderData.map((item) => (
              <tr key={item.label}>
                <td>{item.label}</td>
                <td>{item.frekuensi}</td>
                <td>{Number(item.probabilitas).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PriorPage;
