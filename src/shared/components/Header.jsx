import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {Link, useNavigate } from 'react-router-dom';
import styles from '../assets/styles.module.css';
import { ButtonSm } from '../styled/Button.styled';

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
		? <><li><Link to="/login"><ButtonSm bg="var(--green-color)">Signin</ButtonSm></Link></li><li><Link to="/register"><ButtonSm bg="var(--pink-color)">Register</ButtonSm></Link></li></>
		: <li><button onClick={handleLogout}>Logout</button></li>;

	return(
		<header style={{marginBottom: '1rem'}}>
			<div className={styles['container']}>      
				<h2 className={styles['brand']}>Blue<span style={{color: 'rgb(161, 233, 255)'}}>Cobalt</span></h2>
				<nav>
					<ul>
						{
							(JSON.stringify(authContext.auth) === '{}')
							?null
							:
							<>
							<li><Link to="/">Flashcards</Link></li>
							<li><Link to="/add">Create Deck</Link></li>
							<li><Link to="/explore">Explore</Link></li>
							<li><Link to="/profile">Profile</Link></li>

							</>
							
						}
						{authButtons}
					</ul>
				</nav>
			</div>
		</header>
	);
}