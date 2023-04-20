import { useState } from 'react';
import styles from '../../assets/styles.module.css';
import { Link } from 'react-router-dom';
import {Input} from '../../components/styles/Input.styled';
import {FormContainer, Form} from '../../components/styles/Form.styled';
import { Button } from '../../components/styles/Button.styled';


export default function RegisterPage() { 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState(''); 
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const [statusCode, setStatusCode] = useState(0);

	const handleRegisterSubmit = async (event) => {
		event.preventDefault();
		console.log(process.env.REACT_APP_SERVER_BASE_URL);
		const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({email, password})
		});
		const { message } = await res.json();
		setResponseMsg(message);
		if(300 <= res.status <= 600) {
			setEmail('');
			setPassword('');
		} 
	};
    
	return (
		<>
			{responseMsg ? <h4>{responseMsg}</h4> : null}
			<FormContainer>
				<div className={styles['formContainer-header']}>
					<h2>Register</h2>
					<p>Enter information to create an account</p>
				</div>
				<Form onSubmit={handleRegisterSubmit}>
					<Input 
						type="text" 
						placeholder="first name"
						value={first}
						onChange={(e) => {
							setFirst(e.target.value);
						}}
					/>
					<Input 
						type="text" 
						placeholder="last name"
						value={last}
						onChange={(e) => {
							setLast(e.target.value);
						}}
					/>
					<Input 
						type="email" 
						placeholder="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<Input 
						type="password" 
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					<Button bg="var(--secondary-color)" color="white" type="submit">Create new account</Button>
					<div className={styles['formContainer-footer']}>
						<div style={{marginTop:'1rem'}}>Have an account? <Link to="/login" style={{color: 'var(--secondary-color)', textDecoration: 'underline'}}>Sign in</Link></div>
					</div>
				</Form>
			</FormContainer>
		</>
	);
}