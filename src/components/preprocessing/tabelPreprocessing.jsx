import React, { useState } from 'react';
import NewPagination from '../base/NewPagination';

function TabelPreprocessing({
  data = [],
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

  const hasData = data && data.length > 0;

  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditValues({
      preprocessed_text: item.preprocessed_text || '',
      emotion: item.emotion || '',
    });
  };

  const handleChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (id) => {
    onUpdate(id, editValues);
    setEditingId(null);
  };

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
                const isEditing = editingId === item.id;

                return (
                  <tr key={item.id}>
                    <td className='align'>
                      {(pagination.currentPage - 1) * pagination.itemsPerPage + index + 1}
                    </td>
                    <td className='text'>{item.text || 'N/A'}</td>
                    <td className='text'>
                      {isEditing ? (
                        <input
                          type='text'
                          value={editValues.preprocessed_text}
                          onChange={(e) => handleChange('preprocessed_text', e.target.value)}
                        />
                      ) : (
                        <span>{item.preprocessed_text || 'N/A'}</span>
                      )}
                    </td>
                    <td className='emotion'>
                      {isEditing ? (
                        <input
                          type='text'
                          value={editValues.emotion}
                          onChange={(e) => handleChange('emotion', e.target.value)}
                        />
                      ) : (
                        <span>{item.emotion || 'N/A'}</span>
                      )}
                    </td>
                    <td className='aksi'>
                      {isEditing ? (
                        <>
                          <button onClick={() => handleSave(item.id)} className='btn-save'>
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
                          <button onClick={() => onDelete(item.id)} className='btn-delete'>
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
            <NewPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.totalPages}
              onPageChange={onPageChange}
            />
          )}
        </div>
      ) : (
        <p className='no-data-message'>
          Tidak ada data pra-pemrosesan yang tersedia. Mohon tambah data terlebih dahulu kemudian
          lakukan tahap pra-pemrosesan kembali.
        </p>
      )}
    </div>
  );
}

export default TabelPreprocessing;
