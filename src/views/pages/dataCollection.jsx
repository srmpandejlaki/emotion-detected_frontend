import React, { useState, useEffect } from "react";
import TabelDataset from "../../components/dataColection/tabelDataset";
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";
import {
  saveManualDataset,
  fetchDatasets,
  fetchAllLabels,
} from "../../utils/api/dataCollection";
import { v4 as uuidv4 } from "uuid";

function DataCollectionPage() {
  const [dataset, setDataset] = useState([]);
  const [existingData, setExistingData] = useState([]);
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
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

        setExistingData(
          allData.map((item) => ({
            id: item.id,
            text: item.text_data,
            label: item.id_label,
            isNew: false,
          }))
        );

        const labels = await fetchAllLabels();
        setLabelList(labels);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    };

    loadInitialData();
  }, []);

  const handleSave = async () => {
    const duplicates = dataset.filter((item) =>
      existingData.some(
        (existing) =>
          existing.text === item.text && existing.label === item.label
      )
    );

    const uniqueData = dataset.filter(
      (item) =>
        !existingData.some(
          (existing) =>
            existing.text === item.text && existing.label === item.label
        )
    );

    if (duplicates.length > 0) {
      alert(
        duplicates.length === 1
          ? "Data sudah ada, silakan ubah kembali."
          : "Ada beberapa data yang sudah ada sebelumnya."
      );

      if (uniqueData.length === 0) return;
    }

    try {
      await saveManualDataset(
        uniqueData.map((item) => ({
          text_data: item.text,
          id_label: item.label,
        }))
      );
      alert("Data berhasil disimpan!");
      setDataset([]);

      const refreshed = await fetchDatasets(1, 1000);
      setExistingData(
        refreshed?.data?.map((item) => ({
          id: item.id,
          text: item.text_data,
          label: item.id_label,
          isNew: false,
        })) || []
      );
    } catch {
      alert("Gagal menyimpan data.");
    }
  };

  const handleCSVParsed = (newData) => {
    const formatted = newData.map((item) => ({
      id: uuidv4(),
      text: item.text,
      label: item.label,
      isNew: true,
    }));
    setDataset((prev) => [...prev, ...formatted]);
  };

  const handleUpdate = (id, field, value) => {
    setDataset((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleAddRow = () => {
    setDataset((prev) => [
      ...prev,
      { id: uuidv4(), text: "", label: "", isNew: true },
    ]);
  };

  return (
    <div className="container">
      <h1>Dataset</h1>
      <section>
        <div className="tabel">
          <TabelDataset
            dataset={[...existingData, ...dataset]}
            onUpdate={handleUpdate}
            labelList={labelList}
          />
          <AddSave onAddData={handleAddRow} onSaveData={handleSave} />
        </div>
        <InputFile onCSVParsed={handleCSVParsed} />
      </section>
    </div>
  );
}

export default DataCollectionPage;
