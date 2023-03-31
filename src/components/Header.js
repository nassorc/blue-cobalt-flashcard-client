import { Link } from 'react-router-dom'
export default function Homepage() {
    return(
        <header>
            Logo
            <nav>
                <ul>
                    <li><Link to="/auth">Login</Link></li>
                    <li><Link to="/auth">Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}