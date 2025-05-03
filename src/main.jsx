import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './views/App';

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

// scss
import './styles/style';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);
