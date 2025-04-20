import React from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import ButtonPreprocessing from '../../components/preprocessing/buttonPreprocessing';

function PreprocessingPage() {
  return (
    <div className="container">
      <h1>Preprocessing</h1>
      <div className="tabel">
        <TabelPreprocessing></TabelPreprocessing>
        <ButtonPreprocessing></ButtonPreprocessing>
      </div>
    </div>
  );
};

export default PreprocessingPage;