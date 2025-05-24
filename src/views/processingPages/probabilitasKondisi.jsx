import React, { useEffect, useState } from 'react';
import { fetchProbCondition } from '../../utils/api/processing';
import NewPagination from '../../components/base/NewPagination';

function KondisiPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (pageToLoad = 1) => {
    setLoading(true);
    setError(null);
    const probConditionRes = await fetchProbCondition(pageToLoad);
    console.log('Probabilitas Kondisi Response:', probConditionRes);
    if (!probConditionRes.error && probConditionRes.data) {
      setData(probConditionRes.data.data);
      setTotalPages(probConditionRes.data.total_pages || 1);
      setPage(probConditionRes.data.current_page || 1);
    } else {
      setError('Gagal mengambil data probabilitas kondisi');
    }
    setLoading(false);
  };

  // Ambil probabilitas kondisi setelah modelId ada
  useEffect(() => {
    const loadProbCondition = async () => {
      await loadData();
    };
    loadProbCondition();
  }, []);

  return (
    <div className='kondisi-page'>
      <h1>Probabilitas Kondisi</h1>
      {loading && <p>Memuat data...</p>}
      {!loading && error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && data.length === 0 && <p>Data tidak tersedia</p>}
      {!loading && !error && data.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Kata</th>
              <th>Probabilitas Emosi</th>
              <th>Prediksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr key={idx}>
                <td>{(page - 1) * 10 + idx + 1}</td>
                <td>{item.kata}</td>
                <td>{item.probabilitas.toFixed(4)}</td>
                <td>{item.label}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!loading && !error && data.length > 0 && (
        <NewPagination currentPage={page} totalPages={totalPages} onPageChange={loadData} />
      )}
    </div>
  );
}

export default KondisiPage;
