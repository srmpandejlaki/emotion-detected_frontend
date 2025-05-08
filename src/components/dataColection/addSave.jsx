import React from "react";

function AddSave({ onAddData, onSaveData }) {
  return (
    <div className="buttons addSave">
      <button className="btn-add" onClick={onAddData}>add Data</button>
      <button className="btn-save" onClick={onSaveData}>Save</button>
    </div>
  );
};

export default AddSave;