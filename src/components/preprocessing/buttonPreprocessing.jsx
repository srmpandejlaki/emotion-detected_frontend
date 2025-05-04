import React from "react";
import { runPreprocessing } from '../../utils/api/preprocessing';

function ButtonPreprocessing({ onComplete }) {
  const handleClick = async () => {
    const result = await runPreprocessing();
    if (!result.error) {
      alert("Preprocessing berhasil!");
      onComplete?.(); // untuk refresh tabel jika props tersedia
    } else {
      alert("Preprocessing gagal!");
    }
  };

  return (
    <button className="btn-process" onClick={handleClick}>
      Preprocess Data
    </button>
  );
}

export default ButtonPreprocessing;
