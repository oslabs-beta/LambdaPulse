import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const verifyLogin = (e) => {
        fetch('/api')
        .then(data => data.json())
        .then(res => {
            console.log(res);
            navigate('/dashboard');
        });
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