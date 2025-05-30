import React from 'react';
import NavProcessing from '../../components/navigationBar/navigationProcessing';
import { Routes, Route } from 'react-router-dom';

// pages
import HomeProcessingPage from '../processingPages/homeProcessing';
import TfIdfPage from '../processingPages/tf-idf';
import PriorPage from '../processingPages/probabilitasPrior';
import KondisiPage from '../processingPages/probabilitasKondisi';
import BertLexiconPage from '../processingPages/bert&lexicon';

class ProcessingPage extends React.Component {
  render() {
    return (
      <div className='container'>
        <h1>Pemrosesan Data</h1>
        <NavProcessing />
        <section>
          <Routes>
            <Route path='/' element={<HomeProcessingPage />} />
            <Route path='tf-idf' element={<TfIdfPage />} />
            <Route path='prob-prior' element={<PriorPage />} />
            <Route path='prob-kondisi' element={<KondisiPage />} />
            <Route path='bert-lexicon' element={<BertLexiconPage />} />
          </Routes>
        </section>
      </div>
    );
  }
}

export default ProcessingPage;
