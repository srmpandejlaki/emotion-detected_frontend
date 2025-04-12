import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './views/App';

import './styles/main.scss';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);