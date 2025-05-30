import React from 'react';

function TabelDataset({
  dataset = [],
  labelList = null,
  onUpdate,
  isProcessing = false,
  currentPage,
  setCurrentPage,
  itemsPerPage = 10,
}) {
  const reversedDataset = [...dataset].reverse();
  const totalPages = Math.ceil(reversedDataset.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reversedDataset.slice(indexOfFirstItem, indexOfLastItem);

  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);

  const emotionOptions = labelList && labelList.length > 0
    ? labelList
    : [
        { emotion_name: "senang" },
        { emotion_name: "percaya" },
        { emotion_name: "terkejut" },
        { emotion_name: "netral" },
        { emotion_name: "takut" },
        { emotion_name: "sedih" },
        { emotion_name: "marah" },
      ];

  return (
    <div className='tabel-dataset-wrapper'>
      {dataset.length > 0 ? (
        <>
          <table className='dataset'>
            <thead>
              <tr>
                <th className='nomor'>No</th>
                <th className='text1'>Teks</th>
                <th className='emotion'>Emosi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                const nomorTabel = (currentPage - 1) * itemsPerPage + index + 1;
                const isNewItem = item.isNew === true;

                return (
                  <tr key={item.id}>
                    <td className='align'>{nomorTabel}</td>
                    <td className='text'>
                      {isNewItem ? (
                        <input
                          type='text'
                          value={item.text}
                          disabled={isProcessing}
                          onChange={(e) => onUpdate(item.id, 'text', e.target.value)}
                        />
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </td>
                    <td className='align'>
                      {isNewItem ? (
                        <select
                          value={item.emotion}
                          disabled={isProcessing}
                          onChange={(e) => onUpdate(item.id, 'emotion', e.target.value)}
                        >
                          <option value=''>Pilih Emosi</option>
                          {emotionOptions.map((label) => (
                            <option key={label.emotion_name} value={label.emotion_name}>
                              {label.emotion_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{item.emotion || 'Tidak ada emosi'}</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {totalPages > 1 && (
            <div className='pagination-controls'>
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1 || isProcessing}
                className='btn-pagination'
              >
                Halaman Pertama
              </button>

              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1 || isProcessing}
                className='btn-pagination'
              >
                Sebelumnya
              </button>

              <span>Halaman {currentPage} dari {totalPages}</span>

              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages || isProcessing}
                className='btn-pagination'
              >
                Berikutnya
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages || isProcessing}
                className='btn-pagination'
              >
                Halaman Terakhir
              </button>
            </div>
          )}

        </>
      ) : (
        <p>Data belum tersedia</p>
      )}
    </div>
  );
}

export default TabelDataset;
