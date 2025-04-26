import React from "react";
import TabelProcessing from '../../components/processing/tabelProcessing';
import TotalData from '../../components/processing/totalData';
import RatioData from '../../components/processing/ratioData';
import ButtonProcess from "../../components/processing/buttonProcess";

function HomeProcessingPage() {
  return (
    <div className="container">
      <h1>Processing</h1>
      <section>
        <div className="tabel">
          <TabelProcessing></TabelProcessing>
        </div>
        <div className="settings">
          <h2>settings</h2>
          <div className="data">
            <TotalData></TotalData>
            <RatioData></RatioData>
          </div>
        </div>
      </section>
      <ButtonProcess></ButtonProcess>
    </div>
  );
};

export default HomeProcessingPage;