import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import DataTable from '../components/DataTable';
import CSVUploader from '../components/CSVUploader';
import ProcessingPanel from '../components/ProcessingPanel';

const App = () => {
  const [selectedDataId, setSelectedDataId] = useState(null);

  return (
    <div className="app">
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/data">Data Collection</Link>
          </li>
          <li>
            <Link to="/upload">Upload CSV</Link>
          </li>
          <li>
            <Link to="/processing">Processing</Link>
          </li>
        </ul>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<h1>Welcome to Data Processing App</h1>} />
          <Route 
            path="/data" 
            element={
              <DataTable 
                onSelectData={(id) => setSelectedDataId(id)} 
              />
            } 
          />
          <Route path="/upload" element={<CSVUploader />} />
          <Route 
            path="/processing" 
            element={
              <ProcessingPanel 
                dataId={selectedDataId} 
              />
            } 
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
