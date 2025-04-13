import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './views/App';

// scss
import './styles/_main.scss';
import './styles/dataCollection.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);