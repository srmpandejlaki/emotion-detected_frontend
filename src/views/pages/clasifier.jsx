import React, { useState } from "react";
import InputText from "../../components/classifier/inputText";
import OutputClassifier from "../../components/classifier/outputText";
import { classifySingleText, saveValidationData } from "../../utils/api/validation";

function ClasifierPage() {
  const [result, setResult] = useState(null);

  const handleClassify = async ({ text }) => {
    try {
      const response = await classifySingleText(text); // text saja, bukan { text }

      // Tampilkan hasil klasifikasi ke UI
      setResult(response.predicted_emotion); // sesuaikan properti dengan backend

      // Simpan hasil klasifikasi ke backend
      const validationData = [
        {
          text: response.text,
          predicted_emotion: response.predicted_emotion,
          actual_emotion: "" // Jika tidak diketahui, kosongkan atau isi nanti
        }
      ];
      await saveValidationData(validationData);
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
