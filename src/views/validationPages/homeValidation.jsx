import React from "react";
import TabelProcessing from '../../components/validation/tabelValidation';
import ButtonProcess from "../../components/validation/buttonProcess";

function HomeValidationPage() {
  return (
    <div className="container">
      <h1>Data Testing</h1>
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