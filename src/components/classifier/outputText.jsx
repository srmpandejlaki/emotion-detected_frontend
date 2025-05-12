import React from "react";

function OutputClassifier({ result, isLoading }) {
  return (
    <div className="output">
      {isLoading ? (
        <p>Mengklasifikasi...</p>
      ) : (
        <p>{result ? result : "Tidak ada hasil"}</p>
      )}
    </div>
  );
}

export default OutputClassifier;