import React from 'react';
import { updatePreprocessingEmotion, deletePreprocessingData } from '../../utils/api/preprocessing';

function ButtonAction({ id, onActionDone }) {
  const handleChange = async () => {
    const newEmotion = prompt("Masukkan label emosi baru:");
    if (!newEmotion) return;

    const result = await updatePreprocessingEmotion(id, newEmotion);
    if (!result.error) {
      alert("Label berhasil diubah!");
      onActionDone?.(); // refresh data tabel
    } else {
      alert("Gagal mengubah label.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    const result = await deletePreprocessingData(id);
    if (!result.error) {
      alert("Data berhasil dihapus!");
      onActionDone?.(); // refresh data tabel
    } else {
      alert("Gagal menghapus data.");
    }
  };

  return (
    <div className="buttons">
      <button className='btn-change' onClick={handleChange}>Change</button>
      <button className='btn-delete' onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ButtonAction;
