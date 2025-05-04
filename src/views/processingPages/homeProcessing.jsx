import React, { useState, useEffect } from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from "../../components/processing/buttonProcess";

function HomeProcessingPage() {
  const [totalData, setTotalData] = useState({ new: 0, old: 0, total: 0 });
  const [dataRatio, setDataRatio] = useState({ train: 70, test: 30 }); // default 70:30
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fungsi ambil data awal
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/processing-data'); // Ganti dengan endpoint API kamu
      const data = await res.json();

      setTotalData({
        new: data.newDataCount,
        old: data.oldDataCount,
        total: data.totalDataCount
      });

      setTableData(data.dataset); // array of { no, preprocessedText, emotion, predictedEmotion }
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Fungsi untuk proses data
  const handleProcess = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trainRatio: dataRatio.train,
          testRatio: dataRatio.test
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Proses berhasil!");
        fetchData(); // perbarui data tabel
      } else {
        alert("Gagal memproses data: " + result.message);
      }
    } catch (err) {
      console.error("Error saat proses:", err);
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
