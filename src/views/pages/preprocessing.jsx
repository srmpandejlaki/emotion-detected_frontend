import React, { useEffect, useState } from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import {
  fetchAllPreprocessing,
  runPreprocessing,
  runPreprocessingMany
} from '../../utils/api/preprocessing';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preprocessingData, setPreprocessingData] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    const startPreprocessing = async () => {
      try {
        // Langkah 1: Ambil semua data dari ProcessResult
        const response = await fetchAllPreprocessing(1, 100); // kamu bisa atur pagination lebih dinamis
        const allData = response.data?.preprocessing || [];

        // Langkah 2: Cek data mana saja yang belum diproses
        const unprocessed = allData.filter(
          item => !item.hasil_preprocessing && item.data?.id_data
        );

        if (unprocessed.length === 1) {
          // Jalankan runPreprocessing untuk 1 data
          const result = await runPreprocessing(unprocessed[0].data.id_data);
          if (result.error) {
            setError("Gagal memproses 1 data.");
            setIsLoading(false);
            return;
          }
        } else if (unprocessed.length > 1) {
          // Jalankan runPreprocessingMany untuk banyak data
          const idList = unprocessed.map(item => item.data.id_data);
          const result = await runPreprocessingMany(idList);
          if (result.error) {
            setError("Gagal memproses banyak data.");
            setIsLoading(false);
            return;
          }
        }

        // Langkah 3: Ambil ulang semua hasil preprocessing (setelah proses selesai)
        const finalData = await fetchAllPreprocessing(1, 100);
        setPreprocessingData(finalData.data?.preprocessing || []);
        setReload(prev => !prev);
        setIsLoading(false);
      } catch (err) {
        console.error("Terjadi kesalahan saat preprocessing:", err);
        setError("Terjadi kesalahan saat preprocessing.");
        setIsLoading(false);
      }
    };

    startPreprocessing();
  }, []);

  if (isLoading) {
    return (
      <div className="container">
        <h1>Preprocessing</h1>
        <p>Mohon tunggu sebentar, sedang melakukan preprocessing...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1>Preprocessing</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Preprocessing</h1>
      <div className="tabel">
        <TabelPreprocessing data={preprocessingData} reload={reload} />
      </div>
    </div>
  );
}

export default PreprocessingPage;
