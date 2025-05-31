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

  const isToday = (dateString) => {
    if (!dateString) return false;
    const date = new Date(dateString);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const loadDatasets = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await fetchDatasets(pageNumber, 10); // 10 per halaman
      const data = response?.data || [];

      const filteredData = data.filter((item) => isToday(item.inserted_at));

      setDatas(
        filteredData.map((item) => ({
          id: item.id,
          text: item.text,
          emotion: item.emotion,
          inserted_at: item.inserted_at,
        }))
      );

      setPage(pageNumber);
      setTotalPages(Math.ceil(filteredData.length / 10)); // hitung dari hasil filter
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
    return (
      <div className='section prior-page'>
        <h2>Prediction Results</h2>
        <p>No data available today.</p>
        <InputCSV />
      </div>
    );
  }

  return (
    <div className='section prior-page'>
      <h2>Prediction Results</h2>
      <section>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className='prior-page'>
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
          </div>
        )}
        <InputCSV />
      </section>
    </div>
  );
}

export default HomeValidationPage;
