import { useState, useRef, useEffect, useContext } from 'react';
import AuthContext from '../../shared/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import FormNotification from '../../shared/components/FormNotification';
import { POST_LOGIN_ENDPOINT } from '../../utils/api';
import {Input} from '../../shared/styled/Input.styled';
import {FormContainer, Form} from '../../shared/styled/Form.styled';
import { Button } from '../../shared/styled/Button.styled';
import styles from '../shared/assets/styles.module.css'
import { PageContainer } from '../../shared/styled/Container.styled';
import { flexbox } from '@chakra-ui/react';
import PageLogo from './shared/components/PageLogo';
import mascot from './shared/assets/monsta.png'
import styled from 'styled-components';

const Mascot = styled.img`
	width: 100%;
	display: block;
	object-fit: contain;
	margin: 0 auto;
`

const MascotContainer = styled.div`
	width: 180px;
`

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
    if(!email || !password) return;
		try {
			const res = await fetch(POST_LOGIN_ENDPOINT(), {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({email, password})
			});
			const data = await res.json();
			if(res.ok) {
				const { token, userId } = data.user; 
				// save token and user id
				localStorage.setItem('userId', userId);
				localStorage.setItem('token', token);
				// document.cookie = `accessToken=${token}`
				// redirect user
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
		<PageContainer>
			<FormContainer>
				<div className={styles['formContainer-header']}>
					<MascotContainer>
						<Mascot src={mascot} />
					</MascotContainer>
					<p className='text-2xl font-semibold'>Welcome back</p>
					<p className='text-stone-700'>Enter email and password to sign in</p>
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
						className='bg-gray-200 border-[1px] border-black/80 rounded-md'
					/>
					<Input 
						type="password" 
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						required
						className='bg-gray-200 border-[1px] border-black/80 rounded-md'
					/>
					<Button
						bg="var(--green-color)"
						color= "black"
						type="submit"
						onSubmit={handleLoginSubmit}
					>
						Sign in
					</Button>
					<div className={styles['or']}>or</div>
					<Button
						bg="var(--pink-color)"
						color="black"
						onClick={(e) => {
							navigate('/register')
						}}
					>
						Create new account
					</Button>
				</Form>
			</FormContainer>
		</PageContainer>
	);
}