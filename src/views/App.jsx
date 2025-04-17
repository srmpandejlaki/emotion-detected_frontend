import React from 'react';
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
          <DataCollectionPage />
        </div>
      </>
    );
  };
}

export default App;
