import React, { useState } from "react";

function InputFile({ onUpload, uploading, selectedDataset }) {
  const [file, getFile] = useState(null);

  const handleChange = (e) => {
    getFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      await onUpload(file);
      getFile(null);
    }
  };

  return (
    <form className="inputFile" onSubmit={handleSubmit}>
      <div className="box">
        <label htmlFor="fileUpload">file.csv (contoh)</label>
        <input
          id="fileUpload"
          type="file"
          accept=".csv"
          onChange={handleChange}
        />
      </div>

      {file && <p>File dipilih: {file.name}</p>}

      {selectedDataset && (
        <p className="info">Dataset terpilih: {selectedDataset}</p>
      )}

      <button className="btn-upload" type="submit" disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload File"}
      </button>
    </form>
  );
}

export default InputFile;
