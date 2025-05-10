import React, { useState } from "react";

function ButtonChange({ item, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmotion, setNewEmotion] = useState(item.emotion);

  const handleSave = () => {
    if (newEmotion.trim() === "") return alert("Label tidak boleh kosong.");
    onSave(item.id, newEmotion); // Panggil fungsi dari parent
    setIsEditing(false);
  };

  return (
    <div className="btnChange">
      {isEditing ? (
        <>
          <input
            type="text"
            value={newEmotion}
            onChange={(e) => setNewEmotion(e.target.value)}
            placeholder="Edit emotion"
            className="input-edit"
          />
          <button onClick={handleSave} className="btn-save">Save</button>
          <button onClick={() => setIsEditing(false)} className="btn-cancel">Batal</button>
        </>
      ) : (
        <button onClick={() => setIsEditing(true)} className="btn-change">Ubah</button>
      )}
    </div>
  );
}

export default ButtonChange;
