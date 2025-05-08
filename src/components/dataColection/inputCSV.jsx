import React from "react";
import Papa from "papaparse";

function InputFile({ onCSVParsed }) {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      skipEmptyLines: true,
      complete: function (results) {
        // Skip baris pertama (header), ambil kolom 0 dan 1 dari setiap baris
        const parsedData = results.data.slice(1).map((row) => {
          return {
            text: row[0] || "", // kolom pertama
            label: row[1] || "", // kolom kedua
          };
        });

        // Panggil fungsi parent
        onCSVParsed(parsedData);
      },
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
}

export default InputFile;
