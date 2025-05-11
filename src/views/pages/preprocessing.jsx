import React, { useEffect, useState } from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import { fetchAllPreprocessing, runPreprocessingMany } from '../../utils/api/preprocessing';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const start = async () => {
      try {
        const fetchResponse = await fetchAllPreprocessing();
        const dataList = fetchResponse.data?.preprocessing || [];
  
        const idDataList = dataList
          .filter(item => item.data?.id_data)
          .map(item => item.data.id_data);
  
        if (idDataList.length > 0) {
          const result = await runPreprocessingMany(idDataList);
          if (result.error) {
            setError("Gagal melakukan preprocessing");
          }
        }
  
        setIsLoading(false);
      } catch (error) {
        console.error("Error saat preprocessing:", error);
        setError("Gagal melakukan preprocessing");
        setIsLoading(false);
      }
    };
  
    start();
  }, []); 

  // Loading state
  if (isLoading) {
    return (
      <div className="container">
        <h1>Preprocessing</h1>
        <p>Mohon tunggu sebentar, sedang melakukan preprocessing...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container">
        <h1>Preprocessing</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  // Setelah selesai
  return (
    <div className="container">
      <h1>Preprocessing</h1>
      <div className="tabel">
        <TabelPreprocessing />
      </div>
    </div>
  );
}

export default PreprocessingPage;
