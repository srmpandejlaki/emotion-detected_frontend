import React from "react";
import NavValidation from "../../components/navigationBar/navigationValidation";
import { Routes, Route } from "react-router-dom";

import HomeValidationPage from "../validationPages/homeValidation";
import PriorValidationPage from "../validationPages/probabilitasPrior";
import KondisiValidationPage from "../validationPages/probabilitasKondisi";
import MatricsValidationPage from "../validationPages/classMatrics";
import MetrixValidationPage from "../validationPages/confusionMetrix";

function ValidationPage() {
  return (
    <div className="container">
      <h1>Validation</h1>
      <NavValidation />
      <section>
        <Routes>
          <Route path="/" element={<HomeValidationPage />} />
          <Route path="/" element={<PriorValidationPage />} />
          <Route path="/" element={<KondisiValidationPage />} />
          <Route path="/" element={<MatricsValidationPage />} />
          <Route path="/" element={<MetrixValidationPage />} />
        </Routes>
      </section>
    </div>
  );
};

export default ValidationPage;