import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './shared/context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import {LoginPage, RegisterPage} from './auth';
import {AddDeckPage, EditDeckPage, PracticeDeckPage, ManageDeckPage} from './deck';
import PrivateRoutes from './utils/PrivateRoutes';
import Header from './shared/components/Header';


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
							<Route path="/" element={<ManageDeckPage />} exact/>
							<Route path="/add" element={<AddDeckPage />} exact />
							<Route path="/practice/:id" element={<PracticeDeckPage />} exact />
							<Route path="/edit/:deckId" element={<EditDeckPage />} exact />
						</Route>
						<Route path="/login" element={<LoginPage/>} />
						<Route path="/register" element={<RegisterPage />}/>
					</Routes>
			}
    
		</>);
}

export default App;
