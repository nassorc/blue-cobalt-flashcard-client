import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import AddDeckPage from './pages/Home/AddDeckPage';
import UserDashboard from './pages/Home/UserDashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import Header from './components/Header';
import PracticePage from './pages/Practice';
import EditDeckPage from './pages/EditDeck';


import './App.css';

function App() {
	const authContext = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	useEffect(() => {
		const userId = window.localStorage.getItem('userId');
		const token = window.localStorage.getItem('token');
		if(userId && token) {
			authContext.setAuth({userId, token});
		}
		setIsLoading(!isLoading);
	}, []);
	return (
		<>
			<Header />
			{
				(isLoading) 
					? null
					: 
					<Routes>
						<Route element={<PrivateRoutes />}>
							<Route path="/" element={<UserDashboard />} exact/>
							<Route path="/add" element={<AddDeckPage />} exact />
							<Route path="/practice/:id" element={<PracticePage />} exact />
							<Route path="/edit/:id" element={<EditDeckPage />} exact />
						</Route>
						<Route path="/login" element={<LoginPage/>} />
						<Route path="/register" element={<RegisterPage />}/>
					</Routes>
			}
    
		</>);
}

export default App;
