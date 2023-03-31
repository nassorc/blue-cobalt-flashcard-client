import { useState, useRef, useEffect, useContext } from 'react'
import AuthContext from '../AuthContext';
import styles from './styles.module.css';
import { Link, useNavigate } from 'react-router-dom';
import FormNotification from '../components/FormNotification';

export default function LoginPage() {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const emailRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [responseMsg, setResponseMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        if(email.length < 1 || password.length < 1) {
            console.log("working")
            return 
        }
        try {
            const res = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            const data = await res.json()
            const { message, details } = data;

            if(res.status >= 200 && res.status <= 399) {
                const { token, userId } = details; 
                // // save token and user id
                window.localStorage.setItem("userId", userId);
                window.localStorage.setItem("token", token);
                // document.cookie = `accessToken=${token}`
                // // redirect user
                authContext.setAuth({ userId, token })
                navigate('/')
            }
            else {
                setResponseMsg(message)
            }
            setEmail('')
            setPassword('')
        }
        catch(error) {
            console.log(error)
        }
    }
    return (
        <>
        <div className={styles.formContainer}>
            <div className={styles["formContainer-header"]}>
                <h2>Welcome back</h2>
                <p>Enter email and password to sign in</p>
            </div>
            {responseMsg ? <FormNotification msg={responseMsg} /> : null}
            <form onSubmit={handleLoginSubmit}>
                <input
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
                <input 
                    type="password" 
                    placeholder="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required
                />
                <input type="submit" value="Sign in" className={styles["login-button"]} onSubmit={handleLoginSubmit}/>
                <div className={styles["or"]}>or</div>
                <button type="submit" className={styles["register-button"]}><Link to="/register" style={{listStyle: "none"}}><div>Create new account</div></Link></button>
            </form>
        </div>
        </>
    )
}