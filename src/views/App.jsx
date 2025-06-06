import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HeaderBar from '../components/headerBar';
import SideContainer from '../components/containers/sideContainer';
import DataCollectionPage from './pages/dataCollection';
import PreprocessingPage from './pages/preprocessing';
import ProcessingPage from './pages/processing';
import ValidationPage from './pages/validation';
import ClasifierPage from './pages/clasifier';
import LocaleContext, { LocaleProvider } from '../contexts/localeContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      localeContext: {
        locale: 'id',
        toggleLocale: () => {
          this.setState((prevState) => {
            return {
              localeContext: {
                ...prevState.localeContext,
                locale: prevState.localeContext.locale === 'id' ? 'en' : 'id'
              }
            }
          })
        }
      }
    };
  };

  render() {
    return (
      <LocaleProvider value={this.state.localeContext}>
        <HeaderBar />
        <div className="main">
          <SideContainer />
          <main>
            <Routes>
              <Route path='/' element={<ClasifierPage />} ></Route>
              <Route path="/dataset" element={<DataCollectionPage />} />
              <Route path="/preprocessing" element={<PreprocessingPage />} />
              <Route path="/processing/*" element={<ProcessingPage />} />
              <Route path="/validation/*" element={<ValidationPage />} />
            </Routes>
          </main>
        </div>
      </LocaleProvider>
    );
  };
}

export default App;