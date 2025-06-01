import React, { useState } from "react";
import NavValidation from "../../components/navigationBar/navigationValidation";
import { Routes, Route } from "react-router-dom";

import HomeValidationPage from "../validationPages/homeValidation";
import ValidationResultPage from "../validationPages/results_validation";
import MatricsValidationPage from "../validationPages/classMatrics";

function ValidationPage() {
  const [predictResults, setPredictResults] = useState([]);
  const [evaluationMetrics, setEvaluationMetrics] = useState(null);

  return (
    <div className="container">
      <h1>Validasi Data</h1>
      <NavValidation />
      <section>
        <Routes>
          <Route
            path="/"
            element={
              <HomeValidationPage
                setPredictResults={setPredictResults}
                setEvaluationMetrics={setEvaluationMetrics}
              />
            }
          />
          <Route
            path="results"
            element={<ValidationResultPage data={predictResults} />}
          />
          <Route
            path="matrics"
            element={<MatricsValidationPage data={evaluationMetrics} />}
          />
        </Routes>
      </section>
    </div>
  );
}

export default ValidationPage;
