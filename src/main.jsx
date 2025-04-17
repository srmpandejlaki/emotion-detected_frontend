import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './views/App';

// scss
import './styles/style';

const root = createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);