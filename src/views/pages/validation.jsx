import React from "react";
import NavValidation from "../../components/navigationBar/navigationValidation";
import { Routes, Route } from "react-router-dom";

import HomeValidationPage from "../validationPages/homeValidation";
import MatricsValidationPage from "../validationPages/classMatrics";

function ValidationPage() {
  return (
    <div className="container">
      <h1>Validasi Data</h1>
      <NavValidation />
      <section>
        <Routes>
          <Route path="/" element={<HomeValidationPage />} />
          <Route path="matrics" element={<MatricsValidationPage />} />
        </Routes>
      </section>
    </div>
  );
};

export default ValidationPage;