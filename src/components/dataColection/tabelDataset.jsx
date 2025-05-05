import React, { useState } from "react";

function TabelDataset({ dataset, onUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const reversedDataset = [...dataset].reverse(); // data terbaru di atas
  const totalPages = Math.ceil(reversedDataset.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedDataset.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="tabel-dataset-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Teks</th>
            <th>Label Emosi</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item, index) => {
            const realIndex = dataset.length - 1 - (indexOfFirstItem + index); // index asli di array awal
            const nomorTabel = dataset.length - (indexOfFirstItem + index); // nomor sesuai data asli
            return (
              <tr key={realIndex}>
                <td>{nomorTabel}</td>
                <td>
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => onUpdate(realIndex, "text", e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => onUpdate(realIndex, "label", e.target.value)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination-controls">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="btn-pagination"
          >
            &laquo; Kembali
          </button>
          <span className="page-info">
            Halaman {currentPage} dari {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="btn-pagination"
          >
            Selanjutnya &raquo;
          </button>
        </div>
      )}
    </div>
  );
}

export default TabelDataset;
