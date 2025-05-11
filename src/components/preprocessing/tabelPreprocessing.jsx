import React, { useState } from "react";

function TabelPreprocessing({ dataset = [], onUpdate = () => {}, labelList = [], onDelete = () => {} }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const hasData = dataset && dataset.length > 0;
  const reversedDataset = [...dataset].reverse();

  const totalPages = Math.ceil(reversedDataset.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedDataset.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const getLabelName = (id_label) => {
    const found = labelList.find(
      (label) => String(label.id_label) === String(id_label)
    );
    return found ? found.emotion_name : id_label;
  };

  return (
    <div className="tabel-dataset-wrapper">
      {hasData ? (
        <>
          <table className="dataset">
            <thead>
              <tr>
                <th className="nomor">No</th>
                <th className="text1">Hasil Preprocessing</th>
                <th className="emotion1">Emosi</th>
                <th className="aksi">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                const nomorTabel = reversedDataset.length - (indexOfFirstItem + index);
                const isEditable = item.isNew === true;

                return (
                  <tr key={item.id_process}>
                    <td className="align">{nomorTabel}</td>
                    <td className="text">
                      {isEditable ? (
                        <input
                          type="text"
                          value={item.hasil_preprocessing}
                          onChange={(e) =>
                            onUpdate(item.id_process, "hasil_preprocessing", e.target.value)
                          }
                        />
                      ) : (
                        <span>{item.hasil_preprocessing}</span>
                      )}
                    </td>
                    <td className="align">
                      {isEditable ? (
                        <select
                          value={item.id_label || ""}
                          onChange={(e) =>
                            onUpdate(item.id_process, "id_label", parseInt(e.target.value))
                          }
                        >
                          <option value="">Pilih Emosi</option>
                          {labelList.map((label) => (
                            <option key={label.id_label} value={label.id_label}>
                              {label.emotion_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{getLabelName(item.id_label)}</span>
                      )}
                    </td>
                    <td className="align">
                      {isEditable ? (
                        <button onClick={() => onUpdate(item.id_process, "save")}>
                          Simpan
                        </button>
                      ) : (
                        <button onClick={() => onDelete(item.id_process)}>Hapus</button>
                      )}
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
        <p className="no-data-message">
          Belum ada data preprocessing, silahkan mulai proses terlebih dahulu.
        </p>
      )}
    </div>
  );
}

export default TabelPreprocessing;
