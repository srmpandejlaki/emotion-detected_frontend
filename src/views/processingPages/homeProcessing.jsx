import React, { useState, useEffect } from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from "../../components/processing/buttonProcess";

function HomeProcessingPage() {
  const [totalData, setTotalData] = useState({ new: 0, old: 0, total: 0 });
  const [dataRatio, setDataRatio] = useState({ train: 0, test: 0 });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    // Contoh API untuk mengambil data
    const fetchData = async () => {
      const response = await fetch('/api/data'); // Ganti dengan endpoint yang sesuai
      const data = await response.json();
      
      setTotalData({
        new: data.newData,
        old: data.oldData,
        total: data.totalData
      });
      setDataRatio({
        train: data.trainRatio,
        test: data.testRatio
      });
      setTableData(data.tableData);
    };

    fetchData();
  }, []);

  const handleProcess = () => {
    console.log('Memulai proses...');
    // Logika untuk memproses data
    // Panggil API backend atau lakukan proses di frontend
  };

  return (
    <div className="container">
      <h1>Processing</h1>
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
            />
          </div>
        </div>
      </section>
      <ButtonProcess onProcess={handleProcess} />
    </div>
  );
};

export default HomeProcessingPage;
