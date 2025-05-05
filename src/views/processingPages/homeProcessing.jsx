import React, { useState, useEffect } from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from "../../components/processing/buttonProcess";

import { fetchProcessingData, processData } from "../../utils/api/processing";

function HomeProcessingPage() {
  const [totalData, setTotalData] = useState({ new: 0, old: 0, total: 0 });
  const [dataRatio, setDataRatio] = useState({ train: 70, test: 30 });
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadInitialData = async () => {
    setIsLoading(true);
    const result = await fetchProcessingData();

    if (result.success) {
      const data = result.data;
      setTotalData({
        new: data.newDataCount,
        old: data.oldDataCount,
        total: data.totalDataCount
      });
      setTableData(data.dataset);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  const handleProcess = async () => {
    setIsLoading(true);
    const result = await processData(dataRatio.train, dataRatio.test);

    if (result.success) {
      alert("Proses berhasil!");
      loadInitialData();
    } else {
      alert("Gagal memproses data: " + (result.message || "Terjadi kesalahan"));
    }

    setIsLoading(false);
  };

  return (
    <div className="container">
      <h1>Processing</h1>

      {isLoading && <p>Memuat data...</p>}

      <section>
        <div className="tabel">
          <TabelProcessing data={tableData} />
        </div>

        <div className="settings">
          <h2>Settings</h2>
          <div className="data">
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

      <ButtonProcess onProcess={handleProcess} />
    </div>
  );
}

export default HomeProcessingPage;
