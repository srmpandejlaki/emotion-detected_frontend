import React, { useEffect, useState } from 'react';
import { getModels, fetchBertLexicon } from '../../utils/api/processing';

function BertLexiconPage() {
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

  // Ambil data BERT + Lexicon setelah modelId tersedia
  useEffect(() => {
    const loadBertLexicon = async () => {
      if (!modelId) return;

      setLoading(true);
      setError(null);
      const result = await fetchBertLexicon(modelId);
      if (!result.error) {
        if (Array.isArray(result.data) && result.data.length > 0) {
          setData(result.data);
        } else {
          setData([]);
          setError("Data BERT + Lexicon kosong");
        }
      } else {
        setError("Gagal mengambil data BERT + Lexicon");
      }
      setLoading(false);
    };
    loadBertLexicon();
  }, [modelId]);

  return (
    <div className="bert-lexicon-page">
      <section className="output-info">
        <h2>Hasil Klasifikasi Ganda (Naive Bayes dan BERT + Lexicon)</h2>
        {loading && <p>Memuat data...</p>}
        {!loading && error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && data.length === 0 && <p>Data tidak tersedia</p>}

        {!loading && !error && data.length > 0 && (
          <table border="1" cellPadding="8">
            <thead>
              <tr>
                <th>No</th>
                <th>Teks</th>
                <th>Prediksi Naive Bayes</th>
                <th>Probabilitas BERT + Lexicon</th>
                <th>Prediksi Akhir</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td>{idx + 1}</td>
                  <td>{item.teks}</td>
                  <td>{item.naive_bayes}</td>
                  <td>
                    {item.probabilitas &&
                      Object.entries(item.probabilitas).map(([emosi, nilai]) => (
                        <div key={emosi}>
                          <strong>{emosi}</strong>: {Number(nilai).toFixed(3)}
                        </div>
                      ))}
                  </td>
                  <td>{item.prediksi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default BertLexiconPage;
