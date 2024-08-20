
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './Components/Layout/MainLayout/MainLayout';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// add to the project mui breadcrumbs,alerts
root.render(
  <BrowserRouter>
    <MainLayout />
  </BrowserRouter>
);
reportWebVitals();
