import React, { useEffect, useState } from "react";
import ButtonAction from "../preprocessing/buttonAction";
import { fetchAllPreprocessing } from "../../utils/api/preprocessing";

function TabelPreprocessing() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const loadData = async () => {
    try {
      const result = await fetchAllPreprocessing();
      console.log("Hasil fetchAllPreprocessing:", result);
      if (!result.error) {
        setData(result.data?.preprocessing || []);
      } else {
        alert("Gagal memuat data preprocessing.");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
      alert("Terjadi kesalahan saat memuat data.");
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  return (
    <div className="table-wrapper">
      {data.length > 0 ? (
        <>
          <table className="dataset">
            <thead>
              <tr>
                <th className="nomor">No.</th>
                <th className="text2">Text</th>
                <th className="text2">Preprocessing Result</th>
                <th className="emotion1">Emotion</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => (
                <tr key={item.id_process}>
                  <td className="align">{indexOfFirstItem + index + 1}</td>
                  <td className="text">{item.data?.text_data || "-"}</td>
                  <td className="text">{item.text_preprocessing}</td>
                  <td className="align">
                    {item.data?.emotion
                      ? `${item.data.emotion.emotion_name}`
                      : "-"}
                  </td>
                  <td className="align">
                    <ButtonAction
                      id={item.data?.id_data}
                      onActionDone={loadData}
                    />
                  </td>
                </tr>
              ))}
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
          Belum ada data, silakan masukkan data baru.
        </p>
      )}
    </div>
  );
}

export default TabelPreprocessing;
