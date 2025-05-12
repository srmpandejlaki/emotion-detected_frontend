import React, { useState, useEffect } from 'react';
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from '../../components/processing/buttonProcess';

import { fetchProcessingData, processData } from '../../utils/api/processing';

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
    const result = await fetchProcessingData(page, limit);

    if (!result.error) {
      const data = result;
      setTotalData({
        new: data.new_data,
        old: data.old_data,
        total: data.total_data,
      });
      setTableData(data.preprocessing);
      setPagination({
        currentPage: page,
        itemsPerPage: limit,
        totalItems: data.total_data || 0,
        totalPages: Math.ceil(data.total_pages) || 1,
      });
      // setDataRatio({
      //   train: data.train_ratio,
      //   test: data.test_ratio,
      // });
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
    const result = await processData(dataRatio.train, dataRatio.test);

    if (result.success) {
      alert('Proses berhasil!');
      loadInitialData();
    } else {
      alert('Gagal memproses data: ' + (result.message || 'Terjadi kesalahan'));
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
              trainRatio={dataRatio.train}
              testRatio={dataRatio.test}
              onChangeRatio={setDataRatio}
            />
          </div>
        </div>
      </section>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <ButtonProcess onProcess={handleProcess} />
        {isLoading && <p>Memuat data...</p>}
      </div>
    </div>
  );
}

export default HomeProcessingPage;
