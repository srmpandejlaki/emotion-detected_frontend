import React, { useEffect, useState } from 'react';

const dummyData = [
  {
    id: 1,
    teks: 'Pelayanan sangat lambat',
    probabilitas: {
      marah: 0.4,
      sedih: 0.4,
      senang: 0.1,
      takut: 0.1
    },
    prediksi: 'marah, sedih', // dua emosi dengan nilai sama
    perluPengujianLanjutan: true
  },
  {
    id: 2,
    teks: 'Petugas sangat membantu',
    probabilitas: {
      marah: 0.1,
      sedih: 0.05,
      senang: 0.8,
      takut: 0.05
    },
    prediksi: 'senang',
    perluPengujianLanjutan: false
  }
];

function KondisiPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Ganti dengan fetch ke backend-mu jika sudah tersedia
    setData(dummyData);
  }, []);

  return (
    <div className="kondisi-page">
      <h1>Probabilitas Kondisi</h1>
      <table>
        <thead>
          <tr>
            <th>No</th>
            <th>Teks</th>
            <th>Probabilitas Emosi</th>
            <th>Prediksi</th>
            <th>Perlu Pengujian Lanjutan</th>
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
                    <strong>{emosi}</strong>: {nilai.toFixed(2)}
                  </div>
                ))}
              </td>
              <td>{item.prediksi}</td>
              <td>
                {item.perluPengujianLanjutan ? (
                  <span className="perlu-lanjutan">Ya</span>
                ) : (
                  <span className="tidak-perlu">Tidak</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default KondisiPage;
