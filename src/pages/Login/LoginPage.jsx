import { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import styles from '../../common/assets/styles.module.css';
import { useNavigate } from 'react-router-dom';
import FormNotification from '../../common/components/FormNotification';
import { POST_LOGIN_ENDPOINT } from '../../utils/api';
import {Input} from '../../components/styles/Input.styled';
import {FormContainer, Form} from '../../components/styles/Form.styled';
import { Button } from '../../components/styles/Button.styled';


export default function LoginPage() {
	const authContext = useContext(AuthContext);
	const navigate = useNavigate();
	const emailRef = useRef();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [responseMsg, setResponseMsg] = useState('');

	// focus email field on load
	useEffect(() => {
		emailRef.current.focus();
	}, []);

	const handleLoginSubmit = async (event) => {
		event.preventDefault();
		if(email.length < 1 || password.length < 1) {
			console.log('working');
			return; 
		}
		try {
			const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}${POST_LOGIN_ENDPOINT}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password})
			});
			const data = await res.json();
			const { message, details } = data;
			if(res.ok) {
				const { token, userId } = details; 
				// // save token and user id
				window.localStorage.setItem('userId', userId);
				window.localStorage.setItem('token', token);
				// document.cookie = `accessToken=${token}`
				// // redirect user
				authContext.setAuth({ userId, token });
				navigate('/');
			}
			else {
				setResponseMsg(message);
			}
			setEmail('');
			setPassword('');
		}
		catch(error) {
			console.log(error);
		}
	};
	return (
		<>
			<FormContainer>
				<div className={styles['formContainer-header']}>
					<h2>Welcome back</h2>
					<p>Enter email and password to sign in</p>
				</div>
				{responseMsg ? <FormNotification msg={responseMsg} bg="rgb(245, 233, 196)" borderColor="rgb(237, 222, 175)"/> : null}
				<Form onSubmit={handleLoginSubmit}>
					<Input
						type="email" 
						placeholder="email"
						autoComplete="off"
						ref={emailRef}
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						required
					/>
					<Input 
						type="password" 
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
					/>
					<Button
						bg="var(--primary-color)"
						color= "white"
						type="submit"
						onSubmit={handleLoginSubmit}
					>
						Sign in
					</Button>
					<div className={styles['or']}>or</div>
					<Button
						bg="var(--secondary-color)"
						color="white"
						onClick={(e) => {
							navigate('/register')
						}}
					>
						Create new account
					</Button>
				</Form>
			</FormContainer>
		</>
	);
}