import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBar from '../components/headerBar';
import SideContainer from '../components/containers/sideContainer';
import DataCollectionPage from './pages/dataCollection';
import PreprocessingPage from './pages/preprocessing';

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
              <Route path="/" element={<DataCollectionPage />} />
              <Route path="/preprocessing" element={<PreprocessingPage />} />
            </Routes>
          </main>
        </div>
      </>
    );
  };
}

export default App;
