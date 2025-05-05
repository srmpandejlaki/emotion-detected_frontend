import React, { useState } from 'react';
import { dataCollectionService } from '../utils/api';

const CSVUploader = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null);
    setSuccess(false);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    try {
      setLoading(true);
      await dataCollectionService.uploadCSV(file);
      setSuccess(true);
      setError(null);
      setFile(null);
    } catch (err) {
      setError('Failed to upload file');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="csv-uploader">
      <h2>Upload CSV File</h2>
      <div className="upload-container">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          disabled={loading}
        />
        <button onClick={handleUpload} disabled={loading || !file}>
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
      {success && <div className="success">File uploaded successfully!</div>}
    </div>
  );
};

export default CSVUploader; 