import React, { useState } from 'react';

function TabelPreprocessing({
  data = [],
  labelList = [],
  onUpdate = () => {},
  onDelete = () => {},
  pagination = {
    currentPage: 1,
    itemsPerPage: 10,
    totalItems: 0,
    totalPages: 1,
  },
  onPageChange = () => {},
}) {
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});

  // Check if data exists
  const hasData = data && data.length > 0;

  // Get emotion name from data structure
  const getEmotionName = (item) => {
    if (item.data?.emotion?.emotion_name) return item.data.emotion.emotion_name;
    const foundLabel = labelList.find((label) => label.id_label === item.data?.id_label);
    return foundLabel ? foundLabel.emotion_name : item.data?.id_label || 'N/A';
  };

  // Handle edit button click
  const handleEdit = (item) => {
    setEditingId(item.id_process);
    setEditValues({
      text_preprocessing: item.text_preprocessing || '',
      id_label: String(item.data?.id_label) || '',
    });
  };

  // Handle input changes
  const handleChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle save
  const handleSave = (id) => {
    onUpdate(id, editValues);
    setEditingId(null);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingId(null);
  };

  return (
    <div>
      {hasData ? (
        <div className='tabel-dataset-wrapper'>
          <table className='dataset'>
            <thead>
              <tr>
                <th className='nomor'>No</th>
                <th className='text1'>Teks Asli</th>
                <th className='text1'>Hasil Pra-pemrosesan</th>
                <th className='emotion'>Emosi</th>
                <th className='aksi'>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isEditing = editingId === item.id_process;

                return (
                  <tr key={item.id_process}>
                    <td className='align'>
                      {(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}
                    </td>
                    <td className='text'>{item.data?.text_data || 'N/A'}</td>
                    <td className='text'>
                      {isEditing ? (
                        <input
                          type='text'
                          value={editValues.text_preprocessing}
                          onChange={(e) => handleChange('text_preprocessing', e.target.value)}
                        />
                      ) : (
                        <span>{item.text_preprocessing || 'N/A'}</span>
                      )}
                    </td>
                    <td className='emotion'>
                      {isEditing ? (
                        <select
                          value={editValues.id_label}
                          onChange={(e) => handleChange('id_label', e.target.value)}
                        >
                          <option value=''>Pilih Emosi</option>
                          {labelList.map((label) => (
                            <option key={label.id_label} value={label.id_label}>
                              {label.emotion_name}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <span>{getEmotionName(item)}</span>
                      )}
                    </td>
                    <td className='aksi'>
                      {isEditing ? (
                        <>
                          <button onClick={() => handleSave(item.id_process)} className='btn-save'>
                            Simpan
                          </button>
                          <button onClick={handleCancel} className='btn-cancel'>
                            Batal
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(item)} className='btn-edit'>
                            Ubah
                          </button>
                          <button onClick={() => onDelete(item.id_process)} className='btn-delete'>
                            Hapus
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {pagination.totalPages > 1 && (
            <div className='pagination-controls'>
              <button
                onClick={() => onPageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
                className='btn-pagination'
              >
                &laquo; Sebelumnya
              </button>
              <span className='page-info'>
                Halaman {pagination.currentPage} dari {pagination.totalPages}
              </span>
              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className='btn-pagination'
              >
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </div>
      ) : (
        <p className='no-data-message'>
          Tidak ada data pra-pemrosesan yang tersedia. Mohon tambah data terlebih dahulu kemudian lakukan tahap pra-pemrosesan kembali.
        </p>
      )}
    </div>
  );
}

export default TabelPreprocessing;
