import { useState } from 'react';
import styles from '../../assets/styles.module.css';
import { Link } from 'react-router-dom';
import {Input} from '../../components/styles/Input.styled';
import {FormContainer, Form} from '../../components/styles/Form.styled';
import { Button } from '../../components/styles/Button.styled';
import FormNotification from '../../components/FormNotification';

export default function RegisterPage() { 
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState(''); 
	const [first, setFirst] = useState('');
	const [last, setLast] = useState('');
	const [responseMsg, setResponseMsg] = useState('');
	const [responseOk, setResponseOk] = useState(false);

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

		if(res.ok) {
			setResponseOk(true);
		}
		else {
			setResponseOk(false);
			setEmail('');
			setPassword('');
		}
	};
    
	return (
		<>
			{/* {responseMsg ? <h4>{responseMsg}</h4> : null} */}
			<FormContainer>
				<div className={styles['formContainer-header']}>
					<h2>Register</h2>
					<p>Enter information to create an account</p>
				</div>
				{(responseMsg && responseOk) ? <FormNotification msg={responseMsg} bg="rgb(164, 237, 166)" borderColor="rgb(70, 143, 73)" color="rgb(70, 143, 73)"/> : null}
				{(responseMsg && !responseOk) ? <FormNotification msg={responseMsg} bg="rgb(245, 233, 196)" borderColor="rgb(237, 222, 175)" color="rgb(82, 81, 11)" /> : null}
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