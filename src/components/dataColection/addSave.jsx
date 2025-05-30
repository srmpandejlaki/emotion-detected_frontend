import React from "react";

function AddSave({ onAddData, onSaveData, hasNewData, onCancel, isProcessed }) {
  return (
    <div className="buttons addSave">
      <button className="btn-add" onClick={onAddData}>Tambah Data</button>
      <button className="btn-save" onClick={onSaveData} disabled={isProcessed} >Simpan</button>
      {hasNewData && (
        <button onClick={onCancel} className="btn-cancel">
          Batal
        </button>
      )}
    </div>
  );
};

export default AddSave;