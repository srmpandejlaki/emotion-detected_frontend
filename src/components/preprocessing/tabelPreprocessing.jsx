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

  // Calculate item numbers correctly
  const calculateItemNumber = (index) => {
    return pagination.totalItems - ((pagination.currentPage - 1) * pagination.itemsPerPage + index);
  };

  return (
    <div className='tabel-dataset-wrapper'>
      {hasData ? (
        <>
          <table className='dataset'>
            <thead>
              <tr>
                <th className='nomor'>No</th>
                <th className='text'>Original Text</th>
                <th className='text'>Preprocessed Text</th>
                <th className='emotion'>Emotion</th>
                <th className='aksi'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => {
                const isEditing = editingId === item.id_process;

                return (
                  <tr key={item.id_process}>
                    <td className='align'>{calculateItemNumber(index)}</td>
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
                          <option value=''>Select Emotion</option>
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
                            Save
                          </button>
                          <button onClick={handleCancel} className='btn-cancel'>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleEdit(item)} className='btn-edit'>
                            Edit
                          </button>
                          <button onClick={() => onDelete(item.id_process)} className='btn-delete'>
                            Delete
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
                &laquo; Previous
              </button>
              <span className='page-info'>
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => onPageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
                className='btn-pagination'
              >
                Next &raquo;
              </button>
            </div>
          )}
        </>
      ) : (
        <p className='no-data-message'>
          No preprocessing data available. Please run the preprocessing first.
        </p>
      )}
    </div>
  );
}

export default TabelPreprocessing;
