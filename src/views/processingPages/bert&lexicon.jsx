import React, { useEffect, useState } from 'react';
import { fetchBertLexicon } from '../../utils/api/processing';
import NewPagination from '../../components/base/NewPagination';

function BertLexiconPage() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadData = async (pageToLoad = 1) => {
    setLoading(true);
    setError(null);
    const bertLexiconRes = await fetchBertLexicon(pageToLoad);
    console.log('BERT + Lexicon Response:', bertLexiconRes);
    if (!bertLexiconRes.error && bertLexiconRes.data) {
      setData(bertLexiconRes.data.data);
      setTotalPages(bertLexiconRes.data.total_pages);
      setPage(bertLexiconRes.data.current_page);
    } else {
      setError('Gagal mengambil data BERT + Lexicon');
    }
    setLoading(false);
  };

  // Ambil data BERT + Lexicon setelah modelId tersedia
  useEffect(() => {
    const loadBertLexicon = async () => {
      await loadData();
    };
    loadBertLexicon();
  }, []);

  const handlePageChange = (newPage) => {
    loadData(newPage);
  };

  return (
    <div className='bert-lexicon-page prior-page'>
      <section className='output-info'>
        <h2>Hasil Klasifikasi Ganda (Naive Bayes dan BERT + Lexicon)</h2>
        {loading && <p>Memuat data...</p>}
        {!loading && error && <p style={{ color: 'red' }}>{error}</p>}
        {!loading && !error && data.length === 0 && <p>Data tidak tersedia</p>}

        {!loading && !error && data.length > 0 && (
          <>
            <table className='prior-table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Teks</th>
                  <th>Prediksi Naive Bayes</th>
                  <th>Probabilitas BERT + Lexicon</th>
                  <th>Bobot BERT</th>
                  <th>Bobot Lexicon</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, idx) => (
                  <tr key={idx}>
                    <td>{(page - 1) * 10 + idx + 1}</td>
                    <td>{item.kalimat}</td>
                    <td>{item.prediksi_nb}</td>
                    <td>{item.prediksi_bert}</td>
                    <td>{item.bobot_bert}</td>
                    <td>{item.bobot_lexicon}</td>
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
      </section>
    </div>
  );
}

export default BertLexiconPage;
