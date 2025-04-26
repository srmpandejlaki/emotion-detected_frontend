import React from "react";
import NavProcessing from "../../components/navigationBar/navigationProcessing";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages
import HomeProcessingPage from "../processingPages/homeProcessing";
import PriorPage from '../processingPages/probabilitasPrior';
import KondisiPage from "../processingPages/probabilitasKondisi";
import MatricsPage from "../processingPages/classMatrics";
import MetrixPage from "../processingPages/confusionMetrix";

class ProcessingPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1>Processing</h1>
        <NavProcessing />
        <section>
          <Routes>
            <Route path="/" element={<HomeProcessingPage />} />
            <Route path="prob-prior" element={<PriorPage />} />
            <Route path="prob-kondisi" element={<KondisiPage />} />
            <Route path="class-matrics" element={<MatricsPage />} />
            <Route path="confusion-metrix" element={<MetrixPage />} />
          </Routes>
        </section>
      </div>
    );
  };
}

export default ProcessingPage;
