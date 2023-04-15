import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import './event-graph.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const verifyLogin = (e) => {
        fetch('/api')
        .then(data => data.json())
        .then(res => console.log(res));
    }
    return (
        <div>
            <NavBar />
            <p>Welcome!</p>
            <form onSubmit={(e) => {
                e.preventDefault();
                verifyLogin(e);
            }}>
                <input 
                type="email" 
                id='email'
                placeholder="Email"
                required={true}
                onChange={(e)=>setEmail(e.target.value)}
                />
                <input 
                type="password" 
                id='password'
                placeholder="Password"
                required={true}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <input type="submit" id='login-btn' value='LOGIN'></input>
            </form>

            <p>Don't have an account yet?</p>
            <button>SIGNUP</button>
        </div>
    )
}

export default Login;