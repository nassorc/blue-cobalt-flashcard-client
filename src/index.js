import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider} from './context/AuthContext';
import { ReviewSettingProvider } from './context/ReviewSettingContext';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<AuthProvider>
			<ReviewSettingProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ReviewSettingProvider>
		</AuthProvider>
	</React.StrictMode>
);
