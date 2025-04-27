import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBar from '../components/headerBar';
import SideContainer from '../components/containers/sideContainer';
import DataCollectionPage from './pages/dataCollection';
import PreprocessingPage from './pages/preprocessing';
import ProcessingPage from './pages/processing';
import ValidationPage from './pages/validation';
import ClasifierPage from './pages/clasifier';

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <>
        <HeaderBar />
        <div className="main">
          <SideContainer />
          <main>
            <Routes>
              <Route path='/clasifier' element={<ClasifierPage />} ></Route>
              <Route path="/" element={<DataCollectionPage />} />
              <Route path="/preprocessing" element={<PreprocessingPage />} />
              <Route path="/processing/*" element={<ProcessingPage />} />
              <Route path="/validation/*" element={<ValidationPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  };
}

export default App;
