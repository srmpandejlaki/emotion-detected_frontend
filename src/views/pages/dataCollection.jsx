import React, { useState, useEffect } from 'react';
import TabelDataset from '../../components/dataColection/tabelDataset';
import InputFile from '../../components/dataColection/inputCSV';
import AddSave from '../../components/dataColection/addSave';
import { saveManualDataset, fetchDatasets, fetchAllLabels } from '../../utils/api/dataCollection';
import { v4 as uuidv4 } from 'uuid';

function DataCollectionPage() {
  const [dataset, setDataset] = useState([]);
  const [existingData, setExistingData] = useState([]);
  const [labelList, setLabelList] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false); // State untuk menandai proses backend

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await loadDatasets();
        await loadLabels();
      } catch (error) {
        console.error('Gagal mengambil data:', error);
      }
    };
    loadInitialData();
  }, []);

  const loadDatasets = async () => {
    let page = 1;
    let allData = [];
    let hasMore = true;

    setIsProcessing(true); // Mulai proses
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
          text: item.text_data,
          label: item.id_label,
          isNew: false,
        }))
      );
    } finally {
      setIsProcessing(false); // Selesai proses
    }
  };

  const loadLabels = async () => {
    setIsProcessing(true); // Mulai proses
    try {
      const labels = await fetchAllLabels();
      setLabelList(labels);
    } finally {
      setIsProcessing(false); // Selesai proses
    }
  };

  const filterDuplicates = (data) =>
    data.filter((item) =>
      existingData.some((existing) => existing.text === item.text && existing.label === item.label)
    );

  const handleSave = async () => {
    const duplicates = filterDuplicates(dataset);
    const uniqueData = dataset.filter(
      (item) =>
        !existingData.some(
          (existing) => existing.text === item.text && existing.label === item.label
        )
    );

    if (duplicates.length > 0) {
      alert(
        duplicates.length === 1
          ? 'Data sudah ada, silakan ubah kembali.'
          : 'Ada beberapa data yang sudah ada sebelumnya.'
      );

      if (uniqueData.length === 0) return;
    }

    setIsProcessing(true); // Mulai proses
    try {
      await saveManualDataset(
        uniqueData.map((item) => ({
          text_data: item.text,
          id_label: item.label,
        }))
      );
      alert('Data berhasil disimpan!');
      setDataset([]);
      await loadDatasets();
    } catch {
      alert('Gagal menyimpan data.');
    } finally {
      setIsProcessing(false); // Selesai proses
    }
  };

  const handleCSVParsed = (newData) => {
    const updatedLabelList = [...labelList];

    const formattedData = newData.map((item) => {
      const labelName = item.label.trim().toLowerCase();

      let labelObj = updatedLabelList.find(
        (label) => label.emotion_name.toLowerCase() === labelName
      );

      if (!labelObj) {
        labelObj = {
          id_label: uuidv4(),
          emotion_name: labelName,
        };
        updatedLabelList.push(labelObj);
      }

      return {
        id: uuidv4(),
        text: item.text,
        label: labelObj.id_label,
        label_name: labelObj.emotion_name,
        isNew: true,
      };
    });

    setLabelList(updatedLabelList);
    setDataset((prev) => [...prev, ...formattedData]);
  };

  const handleUpdate = (id, field, value) => {
    setDataset((prev) => prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const handleAddRow = () => {
    setDataset((prev) => [...prev, { id: uuidv4(), text: '', label: '', isNew: true }]);
  };

  const handleCancel = () => {
    setDataset([]);
  };

  return (
    <div className='container'>
      <h1>Dataset</h1>
      <section>
        <div className='tabel'>
          <TabelDataset
            dataset={[...existingData, ...dataset]}
            onUpdate={handleUpdate}
            labelList={labelList}
          />
          <AddSave
            onAddData={handleAddRow}
            onSaveData={handleSave}
            onCancel={handleCancel}
            hasNewData={dataset.length > 0}
            isProcessing={isProcessing} // Kirim state processing ke komponen AddSave
          />
        </div>
        <InputFile 
          onCSVParsed={handleCSVParsed} 
          disabled={isProcessing} // Tambahkan disabled state untuk input file
        />
      </section>
    </div>
  );
}

export default DataCollectionPage;