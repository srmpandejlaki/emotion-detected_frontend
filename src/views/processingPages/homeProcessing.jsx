import React, { useState, useEffect } from 'react';
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from '../../components/processing/buttonProcess';

import { splitDataset, trainModel, fetchProcessedData } from '../../utils/api/processing';

function HomeProcessingPage() {
  const [totalData, setTotalData] = useState({ new: 0, old: 0, total: 0 });
  const [dataRatio, setDataRatio] = useState({
    testRatio: 0, // Hanya menyimpan ratio yang dipilih
  });
  const [splitResult, setSplitResult] = useState(null); // State untuk menyimpan hasil split
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
    const result = await fetchProcessedData(page, limit);

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

  const handleRatioChange = async (newTestRatio) => {
    const response = await splitDataset(newTestRatio);
    if (response.error) {
      alert('Gagal membagi dataset: ' + response.message);
    } else {
      setSplitResult(response.data);
    }
    setDataRatio({
      testRatio: newTestRatio,
    });
  };

  const handleProcess = async () => {
    setIsLoading(true);
    try {
      const trainResult = await trainModel(dataRatio.testRatio);

      if (trainResult.error) {
        alert('Gagal melatih model: Terjadi kesalahan');
      } else {
        alert('Proses pelatihan berhasil!');
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
        <div className='section prior-page'>
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
              testRatio={dataRatio.testRatio}
              onChangeRatio={handleRatioChange}
              trainCount={splitResult?.train_size || 0}
              testCount={splitResult?.test_size || 0}
            />
          </div>
          {isLoading && <p>Memuat data...</p>}
          <ButtonProcess onProcess={handleProcess} />
        </div>
      </section>
    </div>
  );
}

export default HomeProcessingPage;
