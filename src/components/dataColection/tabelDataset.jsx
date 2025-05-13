import React, { useState } from 'react';

function TabelDataset({ dataset, onUpdate, labelList }) {
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
    const found = labelList.find((label) => String(label.id_label) === String(id_label));
    return found ? found.emotion_name : 'Label Tidak Ditemukan';
  };

  // Perbaikan fungsi onUpdate: bisa ditambahkan validasi di sini
  const handleUpdate = (id, field, value) => {
    if (field === 'text') {
      if (!value || value.trim() === '') {
        alert('Teks tidak boleh kosong!');
        return;
      }
    }
    if (field === 'label') {
      if (field === 'label') {
        if (!value) {
          alert('Pilih label emosi yang valid!');
          return;
        }
        // Jangan parseInt!
      }
    }

    onUpdate(id, field, value);
  };

  return (
    <div className='tabel-dataset-wrapper'>
      {hasData ? (
        <>
          <table className='dataset'>
            <thead>
              <tr>
                <th className='nomor'>No</th>
                <th className='text1'>Teks</th>
                <th className='emotion'>Label Emosi</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item, index) => {
                const nomorTabel = reversedDataset.length - (indexOfFirstItem + index);
                const isEditable = item.isNew === true;

                return (
                  <tr key={index}>
                    <td className='align'>{nomorTabel}</td>
                    <td className='text'>
                      {isEditable ? (
                        <input
                          type='text'
                          value={item.text || ''}
                          onChange={(e) => handleUpdate(item.id, 'text', e.target.value)}
                        />
                      ) : (
                        <span>{item.text}</span>
                      )}
                    </td>
                    <td className='align'>
                      {isEditable ? (
                        <select
                          value={item.label || ''}
                          onChange={(e) => handleUpdate(item.id, 'label', e.target.value)}
                        >
                          <option value=''>Pilih Emosi</option>
                          {labelList.map((label) => (
                            <option key={label.id_label} value={label.id_label}>
                              {label.emotion_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{getLabelName(item.label || item.id_label)}</span>
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
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className='btn-pagination'
              >
                &laquo; Kembali
              </button>
              <span className='page-info'>
                Halaman {currentPage} dari {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className='btn-pagination'
              >
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </>
      ) : (
        <p className='no-data-message'>Belum ada data, silakan masukkan data baru.</p>
      )}
    </div>
  );
}

export default TabelDataset;
