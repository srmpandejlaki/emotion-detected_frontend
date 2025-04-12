import React from 'react';
import HeaderBar from '../components/headerBar';
import SideContainer from '../components/sideBar/sideContainer';
import DataCollectionPage from './pages/dataCollection';

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
