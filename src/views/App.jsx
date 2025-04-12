import React from 'react';
import SideContainer from '../components/sideBar/sideContainer';

class App extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <div>
        <h1>Emotion Detected App for Police Performance in Indonesia</h1>
        <SideContainer />
      </div>
    );
  };
}

export default App;
