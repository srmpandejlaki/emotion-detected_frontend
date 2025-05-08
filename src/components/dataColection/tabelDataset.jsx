import React, { useState } from "react";

function TabelDataset({ dataset, onUpdate }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const hasData = dataset && dataset.length > 0;

  // Data terbaru di atas
  const reversedDataset = [...dataset].reverse();

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
      {hasData ? (
        <>
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
                const realIndex = dataset.findIndex((d) => d.id === item.id || d === item);
                const nomorTabel = reversedDataset.length - (indexOfFirstItem + index);
                return (
                  <tr key={item.id || index}>
                    <td>{nomorTabel}</td>
                    <td>
                      <input
                        type="text"
                        value={item.text || item.text_data || ""}
                        onChange={(e) =>
                          onUpdate(realIndex, "text", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.label || item.id_label || ""}
                        onChange={(e) =>
                          onUpdate(realIndex, "label", e.target.value)
                        }
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
        </>
      ) : (
        <p className="no-data-message">Belum ada data, silakan masukkan data baru.</p>
      )}
    </div>
  );
}

export default TabelDataset;
