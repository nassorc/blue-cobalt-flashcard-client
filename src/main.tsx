import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider as OldAuthProvider} from './shared/context/AuthContext';
import { AuthProvider } from './shared/context/auth';
import { ReviewSettingProvider } from './shared/context/ReviewSettingContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<AuthProvider>
      <OldAuthProvider>
        <ReviewSettingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ReviewSettingProvider>
      </OldAuthProvider>
		</AuthProvider>
	</React.StrictMode>
);
