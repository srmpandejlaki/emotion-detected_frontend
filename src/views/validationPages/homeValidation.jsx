import React, { useEffect, useState } from 'react';
import { fetchDatasets } from '../../utils/api/dataCollection'; 
import NewPagination from '../../components/base/NewPagination';
import InputCSV from '../../components/dataColection/inputCSV';

function HomeValidationPage() {
  const [datas, setDatas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadDatasets();
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadInitialData();
  }, []);

  const loadDatasets = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetchDatasets(pageNumber, 10); // 10 per halaman
      const data = response?.data || [];
      const total = response?.total || 0; // pastikan backend mengirim total
  
      setDatas(
        data.map((item) => ({
          id: item.id,
          text: item.text,
          emotion: item.emotion,
          inserted_at: item.inserted_at,
          isNew: false,
        }))
      );
  
      setPage(pageNumber);
      setTotalPages(Math.ceil(total / 10));
    } catch (error) {
      console.error("Failed to load datasets:", error);
    } finally {
      setLoading(false);
    }
  };
    
  const handlePageChange = (newPage) => {
    loadDatasets(newPage);
  };

  if (datas.length === 0) {
    return null;
  }

  return (
    <div className='section prior-page'>
      <h2>Prediction Results</h2>
      <InputCSV />
      {loading ? (
        <p>Loading...</p>
      ) : datas.length === 0 ? (
        <p>No results available.</p>
      ) : (
        <>
          <table className='prior-table'>
            <thead>
              <tr>
                <th>No</th>
                <th>Text</th>
                <th>Actual Label</th>
              </tr>
            </thead>
            <tbody>
              {datas.map((item, index) => (
                <tr key={index}>
                  <td>{(page - 1) * 10 + index + 1}</td>
                  <td>{item.text}</td>
                  <td>{item.emotion}</td>
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
