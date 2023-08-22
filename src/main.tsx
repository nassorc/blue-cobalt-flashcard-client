import ReactDOM from 'react-dom/client';
import App from './App';
import ContextProvider from './components/ContextProvider';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
