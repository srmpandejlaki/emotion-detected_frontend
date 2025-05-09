import React from "react";

function OutputClassifier({ result }) {
  return (
    <div className="output">
      <p>{result ? result : "Tidak ada hasil"}</p>
    </div>
  );
}

export default OutputClassifier;
