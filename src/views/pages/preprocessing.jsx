import React from "react";
import TabelPreprocessing from '../../components/preprocessing/tabelPreprocessing';
import ButtonPreprocessing from '../../components/preprocessing/buttonPreprocessing';

function PreprocessingPage() {
  return (
    <div className="container">
      <h1>Preprocessing</h1>
      <div className="tabel">
        <TabelPreprocessing></TabelPreprocessing>
      </div>
      <ButtonPreprocessing></ButtonPreprocessing>
    </div>
  );
};

export default PreprocessingPage;