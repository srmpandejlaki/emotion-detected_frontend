import React, { useState, useEffect, useRef } from "react";
import TableDataset from "../../components/dataColection/tabelDataset";
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";
import { saveManualDataset, fetchDatasets, fetchLabelDatasetById } from "../../utils/api/dataCollection";
import { v4 as uuidv4 } from "uuid";

function DataCollectionPage() {
  const [dataset, setDataset] = useState([]);
  const [existingData, setExistingData] = useState([]);
  const [labels, setLabels] = useState([]); // State untuk menyimpan data label
  const tableRef = useRef(null); // Untuk referensi ke tabel

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

        setExistingData(allData);
      } catch (error) {
        console.error("Gagal mengambil data dari database:", error);
      }
    };

    const loadLabels = async (id_label) => {
      try {
        const labelsData = await fetchLabelDatasetById(id_label);
        setLabels(labelsData); // Mengatur state labels dengan data dari API
      } catch (error) {
        console.error("Gagal mengambil data label:", error);
      }
    };

    loadInitialData();
    loadLabels();
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

      const uniqueData = dataset.filter(
        (item) =>
          !existingData.some((existing) => existing.text_data === item.text && existing.id_label === item.label)
      );

      if (uniqueData.length === 0) return;

      try {
        await saveManualDataset(uniqueData);
        alert("Data baru berhasil disimpan!");
        setDataset([]);
        const refreshed = await fetchDatasets(1, 1000);
        setExistingData(refreshed?.data || []);
      } catch {
        alert("Gagal menyimpan data.");
      }
    } else {
      try {
        await saveManualDataset(
          dataset.map((item) => ({
            text_data: item.text,
            id_label: item.label,
          }))
        );
      } catch {
        alert("Gagal menyimpan data.");
      }
    }
  };

  const handleCSVParsed = (newData) => {
    setDataset((prevData) => [...prevData, ...newData]);
  };

  const handleUpdate = (index, field, value) => {
    setDataset((prevData) => {
      const updated = [...prevData];
      if (!updated[index]) return prevData;
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const handleAddRow = () => {
    setDataset((prevDataset) => [
      ...prevDataset,
      { id: uuidv4(), text: "", label: "" },
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setDataset((prevDataset) => {
      const updated = [...prevDataset];
      if (!updated[index]) return prevDataset;
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const getLabelById = (id) => {
    const label = labels.find((item) => item.id_label === id); // Menggunakan labels dari state
    return label ? label.name : "Unknown Label";
  };

  return (
    <div className="container">
      <h1>Dataset</h1>
      <section>
        <div className="tabel" ref={tableRef}>
          <TableDataset
            dataset={[...existingData, ...dataset]}
            onUpdate={handleUpdate}
            onInputChange={handleInputChange}
            getLabelById={getLabelById}
          />
          <AddSave onAddData={handleAddRow} onSaveData={handleSave} />
        </div>
        <InputFile onCSVParsed={handleCSVParsed} />
      </section>
    </div>
  );
}

export default DataCollectionPage;
