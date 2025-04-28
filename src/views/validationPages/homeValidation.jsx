import React from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';
import ButtonProcess from "../../components/processing/buttonProcess";

function HomeValidationPage() {
  return (
    <div className="container">
      <h1>Validation</h1>
      <section>
        <div className="tabel">
          <TabelProcessing></TabelProcessing>
        </div>
      </section>
      <ButtonProcess></ButtonProcess>
    </div>
  );
};

export default HomeValidationPage;