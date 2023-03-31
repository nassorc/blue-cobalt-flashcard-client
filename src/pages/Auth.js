import { useState } from 'react'
export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        const {message, token} = await res.json()
        // set cookies
        document.cookie = `token=${token}`
        window.location.pathname = '/'
        window.location.assign('http://localhost:3000/')
        console.log(window.location)
    }

    const handleRegister = async (e) => {
        e.preventDefault()

        const res = await fetch('http://localhost:3001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: registerEmail,
                password: registerPassword
            })
        })
        const {message} = await res.json()

    }
    return (
        <>
            <form onSubmit={(e) => handleLogin(e)}>
                <h2>Login</h2>
                <label htmlFor="email-field">email</label>
                <input 
                    type="email"
                    name="email-field"
                    id="email-field"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="password-field">password</label>
                <input 
                    type="password"
                    name="password-field"
                    id="password-field"
                    value={password}
                    onChange={e=>setPassword(e.target.value)}
                />
                <input type="submit"/>
            </form>
            <form onSubmit={(e) => handleRegister(e)}>
                <h2>Register</h2>
                <label htmlFor="email-register">email</label>
                <input 
                    type="email"
                    name="email-register"
                    id="email-register"
                    value={registerEmail}
                    onChange={e=>setRegisterEmail(e.target.value)}
                />
                <br/>
                <label htmlFor="password-register">password</label>
                <input 
                    type="password"
                    name="password-register"
                    id="password-register"
                    value={registerPassword}
                    onChange={e=>setRegisterPassword(e.target.value)}
                />
                <input type="submit" />
            </form>
        </>
    )
}