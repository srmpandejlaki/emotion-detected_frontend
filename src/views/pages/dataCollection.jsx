import React, { useState } from "react";
import TableDataset from "../../components/dataColection/tabelDataset";
import InputFile from "../../components/dataColection/inputCSV";
import AddSave from "../../components/dataColection/addSave";

function DataCollectionPage() {
  const [dataset, setDataset] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleAddRow = () => {
    setDataset([...dataset, { text: "", label: "" }]);
  };

  const handleUpdateRow = (index, field, value) => {
    const updated = [...dataset];
    updated[index][field] = value;
    setDataset(updated);
  };

  const handleSave = async (data) => {
    // Simulasi POST ke backend
    try {
      console.log("Saving data:", data);
      // await fetch('/api/dataset', { method: 'POST', body: JSON.stringify(data) })
      setDataset([]);
      alert("Data berhasil disimpan!");
    } catch (err) {
      alert("Gagal menyimpan data.");
    }
  };

  const handleUpload = async (file) => {
    setUploading(true);
    try {
      const text = await file.text();
      const lines = text.trim().split("\n");
      const parsed = lines.map((line) => {
        const [text, label] = line.split(",");
        return { text: text.trim(), label: label.trim() };
      });
      setDataset([...dataset, ...parsed]);
    } catch (err) {
      alert("Gagal membaca file.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>Dataset</h1>
      <section>
        <div className="tabel">
          <TableDataset dataset={dataset} onUpdate={handleUpdateRow} />
          <AddSave onAdd={handleAddRow} onSave={() => handleSave(dataset)} />
        </div>
        <InputFile onUpload={handleUpload} uploading={uploading} />
      </section>
    </div>
  );
}

export default DataCollectionPage;
