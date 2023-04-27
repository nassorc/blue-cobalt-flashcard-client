import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useNavigate } from 'react-router-dom';
import styles from '../common/assets/styles.module.css';

export default function Homepage() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem('userId');
		localStorage.removeItem('token');
		authContext.setAuth({});
		navigate('/login');
	};
	const authButtons = (JSON.stringify(authContext.auth) === '{}') 
		? <><li><Link to="/login">Login</Link></li><li><Link to="/register">Register</Link></li></>
		: <li><button onClick={handleLogout}>Logout</button></li>;

	return(
		<header style={{marginBottom: '1rem'}}>
			<div className={styles['container']}>      
				<h2 className={styles['brand']}>BlueCobalt</h2>
				<nav>
					<ul>
						{
							(JSON.stringify(authContext.auth) === '{}')
							?null
							:
							<>
							<li><Link to="/">Decks</Link></li>
							<li><Link to="/add">Add Deck</Link></li>
							<li>Profile</li>
							</>
							
						}
						{authButtons}
					</ul>
				</nav>
			</div>
		</header>
	);
}