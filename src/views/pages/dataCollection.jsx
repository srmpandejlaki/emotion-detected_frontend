import React, { useState, useEffect } from 'react';
import TabelDataset from '../../components/dataColection/tabelDataset';
import InputCSV from '../../components/dataColection/inputCSV';
import AddSave from '../../components/dataColection/addSave';
import { addDatasetData, fetchDatasets, deleteDatasetData } from '../../utils/api/dataCollection';

function DataCollectionPage({ onUpdate }) {
  const [existingData, setExistingData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const combinedData = [...existingData, ...dataset];
  const totalData = combinedData.length;

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadDatasets();
      } catch (error) {
        console.error('Failed to load data:', error);
      }
    };
    loadInitialData();
  }, []);

  const loadDatasets = async () => {
    let page = 1;
    let allData = [];
    let hasMore = true;

    setIsProcessing(true);
    try {
      while (hasMore) {
        const response = await fetchDatasets(page, 50);
        if (response?.data?.length) {
          allData = [...allData, ...response.data];
          page += 1;
        } else {
          hasMore = false;
        }
      }

      setExistingData(
        allData.map((item) => ({
          id: item.id,
          text: item.text,
          emotion: item.emotion,
          inserted_at: item.inserted_at,
          isNew: false,
        }))
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSave = async () => {
    const newData = dataset.filter(
      (item) =>
        !existingData.some(
          (existing) => existing.text === item.text && existing.emotion === item.emotion
        )
    );

    if (newData.length === 0) {
      alert('No new data to save!');
      return;
    }

    setIsProcessing(true);
    try {
      await addDatasetData(
        newData.map((item) => ({
          text: item.text,
          emotion: item.emotion,
        }))
      );
      alert('Data saved successfully!');
      setDataset([]);
      setIsAddingNew(false);
      setCurrentPage(1);
      await loadDatasets();
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async (ids) => {
    if (!window.confirm('Are you sure you want to delete selected data?')) return;

    setIsProcessing(true);
    try {
      await deleteDatasetData(ids);
      alert('Data deleted successfully!');
      await loadDatasets();
    } catch (error) {
      console.error('Delete error:', error);
      alert('Failed to delete data');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpdate = (id, field, value) => {
    const indexInDataset = dataset.findIndex((item) => item.id === id);
    if (indexInDataset >= 0) {
      const updatedDataset = [...dataset];
      updatedDataset[indexInDataset] = {
        ...updatedDataset[indexInDataset],
        [field]: value,
      };
      setDataset(updatedDataset);
    } else {
      alert('Hanya data baru yang bisa diedit!');
      return;
    }

    if (field === 'text' && (!value || value.trim() === '')) {
      alert('Teks tidak boleh kosong!');
      return;
    }
    if (field === 'emotion' && !value) {
      alert('Pilih emosi yang valid!');
      return;
    }

    onUpdate && onUpdate(id, field, value);
  };

  const handleAddNewData = () => {
    const newItem = {
      id: Date.now(),
      text: '',
      emotion: '',
      isNew: true,
    };
    setDataset((prev) => [...prev, newItem]);
    setIsAddingNew(true);
    setCurrentPage(1); // halaman tidak pindah
  };

  const handleCancel = () => {
    setDataset([]);
    setIsAddingNew(false);
  };

  return (
    <div className='container'>
      <h1>Dataset</h1>
      <section>
        <div className='tabel'>
          <TabelDataset
            dataset={combinedData}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
            isProcessing={isProcessing}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
          />
          <AddSave
            onAddData={handleAddNewData}
            onSaveData={handleSave}
            onCancel={handleCancel}
            hasNewData={dataset.length > 0}
            isProcessing={isProcessing}
            setTotalData={totalData}
          />
        </div>
        <InputCSV onDataParsed={setDataset} />
      </section>
    </div>
  );
}

export default DataCollectionPage;
