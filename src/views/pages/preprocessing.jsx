import React from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import ButtonPreprocessing from '../../components/preprocessing/buttonPreprocessing';

function PreprocessingPage() {
  return (
    <div className="container">
      <h1>Preprocessing</h1>
      <div className="tabel">
        <TabelPreprocessing></TabelPreprocessing>
        <div className="buttonPreprocessing">
          <ButtonPreprocessing></ButtonPreprocessing>
        </div>
      </div>
    </div>
  );
};

export default PreprocessingPage;