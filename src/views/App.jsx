import React from 'react';
import HeaderBar from '../components/headerBar';
import SideContainer from '../components/sideBar/sideContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <HeaderBar />
        <SideContainer />
      </div>
    );
  };
}

export default App;
