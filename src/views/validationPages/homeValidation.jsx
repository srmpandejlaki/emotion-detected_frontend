import React, { useState } from 'react';
import { predictBatchEmotion } from '../../utils/api/validation';
import NewPagination from '../../components/base/NewPagination';
import InputCSV from '../../components/dataColection/inputCSV';

function HomeValidationPage() {
  const [datas, setDatas] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const itemsPerPage = 10;
  const emotionOptions = ['senang', 'percaya', 'terkejut', 'netral', 'takut', 'sedih', 'marah'];

  // Handle data dari file CSV
  const handleCSVUpload = (parsedData) => {
    const formatted = parsedData.map((row, idx) => ({
      id: Date.now() + idx,
      text: row.text || '',
      emotion: row.emotion || '',
      isNew: false,
    }));
    setDatas(formatted);
    setPage(1);
    setTotalPages(Math.ceil(formatted.length / itemsPerPage));
  };

  // Tambah data manual
  const handleAddNewData = () => {
    const newItem = {
      id: Date.now(),
      text: '',
      emotion: '',
      isNew: true,
    };
    const updated = [...datas, newItem];
    setDatas(updated);
    setTotalPages(Math.ceil(updated.length / itemsPerPage));
  };

  const handleInputChange = (id, field, value) => {
    setDatas((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleCancel = () => {
    setDatas([]);
    setPage(1);
    setTotalPages(1);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleProcessData = async () => {
    setIsProcessing(true);
    try {
      const texts = datas.map((d) => d.text);
      const predictions = await predictBatchEmotion(texts);
      const updated = datas.map((item, index) => ({
        ...item,
        predictedEmotion: predictions[index],
      }));
      setDatas(updated);
    } catch (error) {
      console.error('Error processing data:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Get current page data
  const currentData = datas.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <div className='section prior-page'>
      <h2>Prediction Results</h2>

      <section>
        {datas.length === 0 ? (
          <div>
            <p>No data uploaded.</p>
            <InputCSV onUpload={handleCSVUpload} />
          </div>
        ) : (
          <div>
            <table className='prior-table'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Text</th>
                  <th>Actual Label</th>
                  <th>Predicted Label</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item, index) => (
                  <tr key={item.id}>
                    <td>{(page - 1) * itemsPerPage + index + 1}</td>
                    <td>
                      {item.isNew ? (
                        <input
                          type='text'
                          value={item.text}
                          onChange={(e) =>
                            handleInputChange(item.id, 'text', e.target.value)
                          }
                        />
                      ) : (
                        item.text
                      )}
                    </td>
                    <td>
                      {item.isNew ? (
                        <select
                          value={item.emotion}
                          onChange={(e) =>
                            handleInputChange(item.id, 'emotion', e.target.value)
                          }
                        >
                          <option value=''>--Pilih Emosi--</option>
                          {emotionOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        item.emotion
                      )}
                    </td>
                    <td>{item.predictedEmotion || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <NewPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />

            <div className="btn-container">
              <InputCSV onUpload={handleCSVUpload} />
              <button onClick={handleProcessData} disabled={isProcessing}>
                {isProcessing ? 'Memproses...' : 'Proses Data'}
              </button>
              <button onClick={handleAddNewData}>Tambah Data</button>
              {datas.length > 0 && (
                <button onClick={handleCancel} className="btn-cancel">
                  Batal
                </button>
              )}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default HomeValidationPage;
