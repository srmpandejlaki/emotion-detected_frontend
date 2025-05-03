import React from "react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CSVReader from "react-csv-reader";
import { fetcher } from "../../utils/api/fetcher";

function InputFile() {
  const [data, setData] = useState([]);
  
  // Mutasi untuk mengirim CSV ke backend
  const { mutate, isLoading, error } = useMutation(
    async (data) => {
      return fetcher("http://localhost:8000/api/upload-csv", {
        method: "POST",
        body: JSON.stringify({ data }),
      });
    },
    {
      onSuccess: () => {
        alert("CSV berhasil diunggah!");
        setData([]); // reset data
      },
    }
  );

  const handleFileUpload = (fileData) => {
    setData(fileData);
  };

  const handleSubmitCSV = () => {
    if (data.length > 0) {
      mutate(data); // Kirim CSV ke backend
    }
  };

  return (
    <div className="inputFile">
      <CSVReader
        onFileLoaded={handleFileUpload}
        inputId="upload-csv-input"
        inputStyle={{ color: "red" }}
        className="box"
      />
      <button className="btn-upload" onClick={handleSubmitCSV} disabled={isLoading || data.length === 0}>
        {isLoading ? "Mengunggah..." : "Unggah CSV"}
      </button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default InputFile;