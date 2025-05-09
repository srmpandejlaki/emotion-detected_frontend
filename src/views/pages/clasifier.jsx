import React, { useState } from "react";
import InputText from "../../components/classifier/inputText";
import OutputClassifier from "../../components/classifier/outputText";
import { predict } from "../../utils/api/classification"; // sesuaikan dengan lokasi file predict.js

function ClasifierPage() {
  const [result, setResult] = useState(null);

  const handleClassify = async ({ text }) => {
    try {
      const response = await predict({ text });
      setResult(response.prediction); // sesuaikan properti hasil dari backend
    } catch (error) {
      console.error("Error during classification:", error);
      setResult("Error");
    }
  };

  return (
    <div className="container">
      <h1>Cari Tahu </h1>
      <section className="inputText">
        <InputText classify={handleClassify} />
        <div className="outputContainer">
          <OutputClassifier result={result} />
        </div>
      </section>
    </div>
  );
}

export default ClasifierPage;
