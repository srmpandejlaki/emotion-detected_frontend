import React from 'react';
import {
  updatePreprocessingEmotion,
  deletePreprocessingData
} from '../../utils/api/preprocessing';

function ButtonAction({ id, onActionDone }) {
  const handleChange = async () => {
    const newEmotion = prompt("Masukkan label emosi baru:");
    if (!newEmotion || !newEmotion.trim()) return;

    try {
      const result = await updatePreprocessingEmotion(id, newEmotion.trim());
      if (!result.error) {
        alert("Label berhasil diubah!");
        onActionDone?.();
      } else {
        alert("Gagal mengubah label.");
      }
    } catch (error) {
      console.error("Error saat mengubah label:", error);
      alert("Terjadi kesalahan saat mengubah label.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm("Yakin ingin menghapus data ini?");
    if (!confirmDelete) return;

    try {
      const result = await deletePreprocessingData(id);
      if (!result.error) {
        alert("Data berhasil dihapus!");
        onActionDone?.();
      } else {
        alert("Gagal menghapus data.");
      }
    } catch (error) {
      console.error("Error saat menghapus data:", error);
      alert("Terjadi kesalahan saat menghapus data.");
    }
  };

  return (
    <div className="buttons">
      <button className="btn-change" onClick={handleChange}>Change</button>
      <button className="btn-delete" onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default ButtonAction;
