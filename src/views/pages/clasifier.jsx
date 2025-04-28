import React from "react";
import InputText from "../../components/classifier/inputText";
import OutputClassifier from "../../components/validation/outputText";

function ClasifierPage() {
  return (
    <div className="container">
      <h1>Clasifikasi</h1>
      <section className="inputText">
        <InputText></InputText>
        <div className="outputContainer">
          <p>This is the output</p>
          <OutputClassifier></OutputClassifier>
        </div>
      </section>
    </div>
  );
};

export default ClasifierPage;