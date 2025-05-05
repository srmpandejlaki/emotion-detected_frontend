import React, { useState } from "react";

function InputFile({ onUpload, uploading, selectedDataset }) {
  const [fileName, setFileName] = useState("");

  const handleChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFileName(selectedFile.name);
      await onUpload(selectedFile); // langsung upload setelah pilih file
    }
  };

  return (
    <div className="inputFile">
      {/* Kolom untuk menampilkan nama file */}
      <input
        className="box"
        type="text"
        value={fileName}
        placeholder="Belum ada file dipilih"
        readOnly
      />

      {/* Tombol untuk memilih file */}
      <label htmlFor="fileUpload" className="btn-upload">
        {uploading ? "Uploading..." : "Pilih File"}
      </label>

      {/* Input file disembunyikan */}
      <input
        id="fileUpload"
        type="file"
        accept=".csv"
        onChange={handleChange}
        style={{ display: "none" }}
        disabled={uploading}
      />

      {/* Menampilkan dataset terpilih (jika ada) */}
      {selectedDataset && (
        <p className="info">Dataset terpilih: {selectedDataset}</p>
      )}
    </div>
  );
}

export default InputFile;
