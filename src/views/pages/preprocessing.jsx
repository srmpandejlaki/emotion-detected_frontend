import React, { useEffect, useState } from 'react';
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import {
  fetchPreprocessedData,
  runPreprocessNewData,
  editPreprocessedData,
  deletePreprocessedData,
} from '../../utils/api/preprocessing';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isPreprocessing, setIsPreprocessing] = useState(false);
  const [error, setError] = useState(null);
  const [preprocessingData, setPreprocessingData] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const loadPreprocessingData = async (page, limit) => {
    try {
      const response = await fetchPreprocessedData(page, limit);
      if (response.error) {
        setError('Gagal memuat data');
        return;
      }

      setPreprocessingData(response.data?.data || []);
      setPagination({
        currentPage: page,
        itemsPerPage: limit,
        totalItems: response.data?.total || 0,
        totalPages: Math.ceil((response.data?.total || 1) / limit),
      });
    } catch (err) {
      console.error('Load error:', err);
      setError('Gagal memuat data');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const response = await editPreprocessedData(id, {
        preprocessed_text: updates.preprocessed_text,
        emotion: updates.emotion,
      });

      if (response.error) {
        setError('Gagal memperbarui data');
        return;
      }

      await loadPreprocessingData(pagination.currentPage, pagination.itemsPerPage);
    } catch (err) {
      console.error('Update error:', err);
      setError('Gagal memperbarui data');
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deletePreprocessedData([id]); // kirim array berisi id
      if (response.error) {
        setError('Gagal menghapus data');
        return;
      }

      await loadPreprocessingData(pagination.currentPage, pagination.itemsPerPage);
    } catch (err) {
      console.error('Delete error:', err);
      setError('Gagal menghapus data');
    }
  };

  useEffect(() => {
    const startPreprocessing = async () => {
      setIsPreprocessing(true);
      setError(null);

      try {
        // Jalankan proses preprocessing baru
        const result = await runPreprocessNewData();
        if (result.error) {
          setError('Gagal melakukan preprocessing data baru');
        }
      } catch (err) {
        console.error('Error saat preprocessing:', err);
        setError('Terjadi kesalahan saat preprocessing');
      }

      // Setelah selesai, load hasilnya
      await loadPreprocessingData(1, 10);
      setIsLoading(false);
      setIsPreprocessing(false);
    };

    startPreprocessing();
  }, []);

  const handlePageChange = (newPage) => {
    loadPreprocessingData(newPage, pagination.itemsPerPage);
  };

  if (isLoading || isPreprocessing) {
    return (
      <div className='container'>
        <h1>Pra-Pemrosesan Data</h1>
        <p className='loading-message'>
          {isPreprocessing ? 'Tunggu sebentar, sedang melakukan preprocessing...' : 'Memuat data, mohon tunggu...'}
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='container'>
        <h1>Pra-Pemrosesan Data</h1>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className='container'>
      <h1>Pra-Pemrosesan Data</h1>
      <div className='tabel'>
        <TabelPreprocessing
          data={preprocessingData}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PreprocessingPage;
