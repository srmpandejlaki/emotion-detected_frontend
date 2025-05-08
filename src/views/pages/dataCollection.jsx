import React, { useState, useEffect } from "react";
import TableDataset from "../../components/dataColection/tabelDataset";
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";
import { saveManualDataset, fetchDatasets } from "../../utils/api/dataCollection";

function DataCollectionPage() {
  const [dataset, setDataset] = useState([]);
  const [existingData, setExistingData] = useState([]);

  useEffect(() => {
    // Ambil semua data awal dari database
    const loadInitialData = async () => {
      try {
        let page = 1;
        let allData = [];
        let hasMore = true;

        while (hasMore) {
          const response = await fetchDatasets(page, 50);
          if (response?.data?.length) {
            allData = [...allData, ...response.data];
            page += 1;
          } else {
            hasMore = false;
          }
        }

        setExistingData(allData);
      } catch (error) {
        console.error("Gagal mengambil data dari database:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleSave = async () => {
    const duplicates = dataset.filter((item) =>
      existingData.some((existing) => existing.text_data === item.text && existing.id_label === item.label)
    );

    if (duplicates.length > 0) {
      if (duplicates.length === 1) {
        alert("Data sudah ada, silakan ubah kembali.");
      } else {
        alert("Ada beberapa data yang sudah ada sebelumnya.");
      }

      // Filter dataset agar hanya yang unik yang dikirim
      const uniqueData = dataset.filter(
        (item) =>
          !existingData.some((existing) => existing.text_data === item.text && existing.id_label === item.label)
      );

      if (uniqueData.length === 0) return; // tidak ada data baru untuk disimpan

      try {
        await saveManualDataset(uniqueData);
        alert("Data baru berhasil disimpan!");
        setDataset([]);
        // refresh data dari database
        const refreshed = await fetchDatasets(1, 1000);
        setExistingData(refreshed?.data || []);
      } catch {
        alert("Gagal menyimpan data.");
      }
    } else {
      try {
        await saveManualDataset(dataset);
        alert("Data berhasil disimpan!");
        setDataset([]);
        const refreshed = await fetchDatasets(1, 1000);
        setExistingData(refreshed?.data || []);
      } catch {
        alert("Gagal menyimpan data.");
      }
    }
  };

  const handleCSVParsed = (newData) => {
    setDataset((prevData) => [...prevData, ...newData]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...dataset];
    updated[index][field] = value;
    setDataset(updated);
  };

  const handleAddRow = () => {
    setDataset([...dataset, { text: "", label: "" }]);
  };

  return (
    <div className="container">
      <h1>Dataset</h1>
      <section>
        <div className="tabel">
          <TableDataset dataset={dataset} onUpdate={handleUpdate} />
          <AddSave onAdd={handleAddRow} onSave={handleSave} />
        </div>
        <InputFile onCSVParsed={handleCSVParsed} />
      </section>
    </div>
  );
}

export default DataCollectionPage;
