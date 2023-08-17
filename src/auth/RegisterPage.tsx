import { useState } from "react";
import styles from "../shared/assets/styles.module.css";
import { Link } from "react-router-dom";
import { Input } from "../shared/styled/Input.styled";
import { FormContainer, Form } from "../shared/styled/Form.styled";
import { Button } from "../shared/styled/Button.styled";
import FormNotification from "../shared/components/FormNotification";
import { POST_REGISTER_ENDPOINT } from "../utils/api";

export default function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [first, setFirst] = useState("");
	const [last, setLast] = useState("");
	const [responseMsg, setResponseMsg] = useState("");
	const [responseOk, setResponseOk] = useState(false);

	const handleRegisterSubmit = async (event) => {
		event.preventDefault();
		const res = await fetch(POST_REGISTER_ENDPOINT(), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});
		const { message } = await res.json();
		setResponseMsg(message);

		if (res.ok) {
			setResponseOk(true);
		} else {
			setResponseOk(false);
			setEmail("");
			setPassword("");
		}
	};

	return (
		<>
			{/* {responseMsg ? <h4>{responseMsg}</h4> : null} */}
			<FormContainer>
				<div className={styles["formContainer-header"]}>
					<p className="text-2xl font-semibold">Register</p>
					<p className="text-stone-700">
						Welcome to our Website. Enter information to create an account
					</p>
				</div>
				{responseMsg && responseOk ? (
					<FormNotification
						msg={responseMsg}
						bg="rgb(164, 237, 166)"
						borderColor="rgb(70, 143, 73)"
						color="rgb(70, 143, 73)"
					>
						<span>
							. Click{" "}
							<Link
								to="/login"
								style={{
									color: "var(--secondary-color)",
									textDecoration: "underline",
								}}
							>
								{" "}
								Sign in
							</Link>{" "}
							to jump to the login page.
						</span>
					</FormNotification>
				) : null}
				{responseMsg && !responseOk ? (
					<FormNotification
						msg={responseMsg}
						bg="rgb(245, 233, 196)"
						borderColor="rgb(237, 222, 175)"
						color="rgb(82, 81, 11)"
					/>
				) : null}
				<Form onSubmit={handleRegisterSubmit}>
					<Input
						type="text"
						placeholder="first name"
						value={first}
						onChange={(e) => {
							setFirst(e.target.value);
						}}
						className="bg-gray-200 border-[1px] border-black/80 rounded-md"
					/>
					<Input
						type="text"
						placeholder="last name"
						value={last}
						onChange={(e) => {
							setLast(e.target.value);
						}}
						className="bg-gray-200 border-[1px] border-black/80 rounded-md"
					/>
					<Input
						type="email"
						placeholder="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
						className="bg-gray-200 border-[1px] border-black/80 rounded-md"
					/>
					<Input
						type="password"
						placeholder="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						className="bg-gray-200 border-[1px] border-black/80 rounded-md"
					/>
					<Button bg="var(--pink-color)" color="black" type="submit">
						Create new account
					</Button>
					<div className={styles["formContainer-footer"]}>
						<div style={{ marginTop: "1rem" }}>
							Have an account?{" "}
							<Link
								to="/login"
								style={{
									color: "darkseagreen",
									textDecoration: "underline",
								}}
							>
								Sign in
							</Link>
						</div>
					</div>
				</Form>
			</FormContainer>
		</>
	);
}
