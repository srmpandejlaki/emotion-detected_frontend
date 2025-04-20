import React from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';

function ProcessingPage() {
  return (
    <div className="container">
      <h1>Processing</h1>
      <div className="tabel">
        <TabelProcessing></TabelProcessing>
      </div>
      <div className="settings"></div>
    </div>
  );
};

export default ProcessingPage;