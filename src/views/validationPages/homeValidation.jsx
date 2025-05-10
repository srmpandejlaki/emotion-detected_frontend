import React, { useState, useEffect } from "react";
import TabelProcessing from '../../components/validation/tabelValidation';
import ButtonProcess from "../../components/validation/buttonProcess";

import { fetchTestingData, processValidationDataset } from "../../utils/api/validation";

function HomeValidationPage() {
  const [testData, setTestData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const loadTestData = async () => {
    const result = await fetchTestingData();
    if (result.success) {
      setTestData(result.data);
    } else {
      alert("Gagal memuat data testing.");
    }
  };

  const handleProcess = async () => {
    setIsProcessing(true);
    const result = await processValidationDataset();
    if (result.success) {
      alert("Data berhasil divalidasi!");
      loadTestData(); // refresh tabel
    } else {
      alert("Gagal memproses: " + (result.message || "Terjadi kesalahan."));
    }
    setIsProcessing(false);
  };

  useEffect(() => {
    loadTestData();
  }, []);

  return (
    <div className="container">
      <h1>Data Testing</h1>
      <section>
        <div className="tabel">
          <TabelProcessing data={testData} />
        </div>
      </section>
      <ButtonProcess onClick={handleProcess} disabled={isProcessing} />
    </div>
  );
}

export default HomeValidationPage;
