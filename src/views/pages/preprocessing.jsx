import React, { useEffect, useState } from 'react';
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import {
  fetchAllPreprocessing,
  updatePreprocessing,
  deletePreprocessing,
} from '../../utils/api/preprocessing';
import { fetchAllLabels } from '../../utils/api/dataCollection';

function PreprocessingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [preprocessingData, setPreprocessingData] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 0,
  });

  const loadLabels = async () => {
    const labels = await fetchAllLabels();
    setLabelList(labels);
  };

  const loadPreprocessingData = async (page, limit) => {
    try {
      const response = await fetchAllPreprocessing(page, limit);
      if (response.error) {
        setError('Failed to load data');
        return;
      }

      setPreprocessingData(response.data?.preprocessing || []);
      setPagination({
        currentPage: page,
        itemsPerPage: limit,
        totalItems: response.data?.total_data || 0,
        totalPages: Math.ceil(response.data?.total_pages) || 1,
      });
    } catch (err) {
      console.error('Load error:', err);
      setError('Failed to load data');
    }
  };

  const handleUpdate = async (id, updates) => {
    try {
      const response = await updatePreprocessing(id, {
        text_preprocessing: updates.text_preprocessing,
        id_label: updates.id_label,
      });

      if (response.error) {
        setError('Failed to update data');
        return;
      }

      // Refresh data with current pagination
      await loadPreprocessingData(pagination.currentPage, pagination.itemsPerPage);
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

      // Refresh data with current pagination
      await loadPreprocessingData(pagination.currentPage, pagination.itemsPerPage);
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
        await loadLabels();
        await loadPreprocessingData(1, 10);
        setIsLoading(false);
      } catch (err) {
        console.error('Error during preprocessing:', err);
        setError('Error during preprocessing');
        setIsLoading(false);
      }
    };

    startPreprocessing();
  }, []);

  const handlePageChange = (newPage) => {
    loadPreprocessingData(newPage, pagination.itemsPerPage);
  };

  if (isLoading) {
    return (
      <div className='container'>
        <h1>Preprocessing</h1>
        <p>Please wait while loading data...</p>
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
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default PreprocessingPage;
