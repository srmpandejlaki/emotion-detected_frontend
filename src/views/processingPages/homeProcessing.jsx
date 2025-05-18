import React, { useState, useEffect } from 'react';
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from '../../components/processing/buttonProcess';

import { fetchPreprocessedData } from '../../utils/api/preprocessing';
import { splitDataset, trainModel } from '../../utils/api/processing';

function HomeProcessingPage() {
  const [totalData, setTotalData] = useState({ new: 0, old: 0, total: 0 });
  const [dataRatio, setDataRatio] = useState({ train: 70, test: 30 });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const loadInitialData = async (page, limit) => {
    setIsLoading(true);
    const result = await fetchPreprocessedData(page, limit);

    if (!result.error) {
      const data = result.data;
      setTotalData({
        new: data.stats.total_new,
        old: data.stats.total_old,
        total: data.total_data,
      });
      setTableData(data.data);
      setPagination({
        currentPage: page,
        itemsPerPage: limit,
        totalItems: data.total_data || 0,
        totalPages: Math.ceil(data.total_pages) || 1,
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const startPreprocessing = async () => {
      setIsLoading(true);

      try {
        await loadInitialData(1, 10);
        setIsLoading(false);
      } catch (err) {
        console.error('Error during processing:', err);
        setIsLoading(false);
      }
    };

    startPreprocessing();
  }, []);

  const handleProcess = async () => {
    setIsLoading(true);
  
    const payload = {
      test_size: dataRatio.test / 100,
    };
  
    try {
      const splitResult = await splitDataset(payload);
      console.log(payload);
  
      if (splitResult.error) {
        alert('Gagal membagi dataset: ' + splitResult.message);
        setIsLoading(false);
        return;
      }
  
      // Ambil data dari splitResult.data
      const { train_size, test_size } = splitResult.data;
      alert(`Dataset berhasil dibagi:\nTrain: ${train_size}\nTest: ${test_size}`);
  
      const trainResult = await trainModel();
  
      if (trainResult.error) {
        alert('Gagal melatih model: ' + (trainResult.message || 'Terjadi kesalahan'));
      } else {
        alert('Proses pelatihan berhasil!');
        loadInitialData(1, 10);
      }
  
    } catch (err) {
      console.error(err);
      alert('Terjadi kesalahan: ' + err.message);
    }
  
    setIsLoading(false);
  };
  
  const handlePageChange = (newPage) => {
    loadInitialData(newPage, pagination.itemsPerPage);
  };

  return (
    <div className='container'>
      <section>
        <div className='tabel'>
          <TabelProcessing
            data={tableData}
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        </div>

        <div className='settings'>
          <h2>Settings</h2>
          <div className='data'>
            <TotalData
              newData={totalData.new}
              oldData={totalData.old}
              totalData={totalData.total}
            />
            <RatioData
              totalData={totalData.total}
              trainRatio={dataRatio.train}
              testRatio={dataRatio.test}
              onChangeRatio={setDataRatio}
            />
          </div>
        </div>
      </section>
      <div className='button-container' >
        {isLoading && <p>Memuat data...</p>}
        <ButtonProcess onProcess={handleProcess} />
      </div>
    </div>
  );
}

export default HomeProcessingPage;
