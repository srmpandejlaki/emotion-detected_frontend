import React from "react";

function OutputClassifier({ result, isLoading }) {
  return (
    <div className="output">
      {isLoading ? (
        <p>Mengklasifikasi...</p>
      ) : result && result.Hybrid_Result ? (
        <p>{result.Hybrid_Result}</p>
      ) : (
        <p>Tidak ada hasil</p>
      )}
    </div>
  );
}

export default OutputClassifier;
