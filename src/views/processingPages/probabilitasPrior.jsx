import React, { useEffect, useState } from 'react';

function PriorPage() {
  const [priorData, setPriorData] = useState([]);

  useEffect(() => {
    // Data dummy untuk simulasi
    const dummyData = [
      { emotion: 'senang', count: 50, probability: 0.25 },
      { emotion: 'marah', count: 30, probability: 0.15 },
      { emotion: 'takut', count: 20, probability: 0.10 },
      { emotion: 'sedih', count: 100, probability: 0.50 },
    ];

    // Simulasi delay seperti ambil data dari API
    setTimeout(() => {
      setPriorData(dummyData);
    }, 500);
  }, []);

  return (
    <div className='section prior-page'>
      <h1>Probabilitas Prior</h1>
      {priorData.length === 0 ? (
        <p>Memuat data...</p>
      ) : (
        <table className='prior-table'>
          <thead>
            <tr>
              <th>Emosi</th>
              <th>Jumlah Data</th>
              <th>Probabilitas Prior</th>
            </tr>
          </thead>
          <tbody>
            {priorData.map((item, index) => (
              <tr key={index}>
                <td>{item.emotion}</td>
                <td>{item.count}</td>
                <td>{item.probability.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PriorPage;
