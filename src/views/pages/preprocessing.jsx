import React, { useEffect, useState } from 'react';
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import {
  fetchAllPreprocessing,
  runPreprocessing,
  runPreprocessingMany,
  updatePreprocessing,
  deletePreprocessing,
} from '../../utils/api/preprocessing';
import { fetchAllLabels } from '../../utils/api/dataCollection';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preprocessingData, setPreprocessingData] = useState([]);
  const [labelList, setLabelList] = useState([]);
  // const [reload, setReload] = useState(false);

  const loadLabels = async () => {
    const labels = await fetchAllLabels();
    setLabelList(labels);
  };

  const handleUpdate = async (id, updates) => {
    try {
      const response = await updatePreprocessing(id, {
        text_preprocessing: updates.text_preprocessing,
        automatic_emotion: updates.id_label,
      });

      if (response.error) {
        setError('Failed to update data');
        return;
      }

      // Refresh data after update
      const refreshed = await fetchAllPreprocessing(1, 100);
      setPreprocessingData(refreshed.data?.preprocessing || []);
    } catch (err) {
      console.error('Update error:', err);
      setError('Failed to update data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePreprocessing(id);

      if (response.error) {
        setError('Failed to delete data');
        return;
      }

      // Refresh data after delete
      const refreshed = await fetchAllPreprocessing(1, 100);
      setPreprocessingData(refreshed.data?.preprocessing || []);
    } catch (err) {
      console.error('Delete error:', err);
      setError('Failed to delete data');
    }
  };

  useEffect(() => {
    const startPreprocessing = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Ambil semua data preprocessing
        await loadLabels();
        const response = await fetchAllPreprocessing(1, 100);

        if (response.error) {
          setError('Gagal mengambil data preprocessing.');
          setIsLoading(false);
          return;
        }

        const allData = response.data?.preprocessing || [];

        // Filter data yang belum diproses
        const unprocessed = allData.filter(
          (item) => !item.hasil_preprocessing && item.data?.id_data
        );

        if (unprocessed.length === 1) {
          const result = await runPreprocessing(unprocessed[0].data.id_data);
          if (result.error) {
            setError('Gagal memproses 1 data.');
            setIsLoading(false);
            return;
          }
        } else if (unprocessed.length > 1) {
          const idList = unprocessed.map((item) => item.data.id_data);
          const result = await runPreprocessingMany(idList);
          if (result.error) {
            setError('Gagal memproses banyak data.');
            setIsLoading(false);
            return;
          }
        }

        // Ambil ulang data terbaru setelah preprocessing
        const finalResponse = await fetchAllPreprocessing(1, 100);

        if (finalResponse.error) {
          setError('Gagal memuat ulang data preprocessing.');
        } else {
          setPreprocessingData(finalResponse.data?.preprocessing || []);
        }

        // setReload((prev) => !prev);
        setIsLoading(false);
      } catch (err) {
        console.error('Terjadi kesalahan saat preprocessing:', err);
        setError('Terjadi kesalahan saat preprocessing.');
        setIsLoading(false);
      }
    };

    startPreprocessing();
  }, []);

  if (isLoading) {
    return (
      <div className='container'>
        <h1>Preprocessing</h1>
        <p>Mohon tunggu sebentar, sedang melakukan preprocessing...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <h1>Preprocessing</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Preprocessing</h1>
      <div className='tabel'>
        <TabelPreprocessing
          data={preprocessingData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          labelList={labelList}
        />
      </div>
    </div>
  );
}

export default PreprocessingPage;
