import React from "react";

function AddSave({ onAddData, onSaveData }) {
  return (
    <div className="buttons addSave">
      <button className="btn-add" onClick={onAddData}>Tambah Data</button>
      <button className="btn-save" onClick={onSaveData}>Simpan</button>
    </div>
  );
};

export default AddSave;