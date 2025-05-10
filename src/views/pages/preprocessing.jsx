import React, { useEffect, useState } from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import { runPreprocessing } from '../../utils/api/preprocessing';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [payload] = useState({}); // kalau perlu kirimkan parameter, masukkan di sini

  useEffect(() => {
    const start = async () => {
      const result = await runPreprocessing(payload);
      if (result.error) {
        setError("Gagal melakukan preprocessing");
      }
      // kalau perlu simpan result.data, bisa set ke state di sini
      setIsLoading(false);
    };

    start();
  }, [payload]);

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
