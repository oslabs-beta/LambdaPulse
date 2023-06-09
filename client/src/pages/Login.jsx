import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';
import { getApiBaseUrl } from '../apiBaseUrl.js';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const verifyLogin = (e) => {
    const userData = {
      email,
      password,
    };
    fetch(`${getApiBaseUrl()}/verifyUser`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(userData),
    })
      .then((response) => {
        if (response.status === 200) {
          navigate('/dashboard');
        } else if (response.status === 401) {
          setErrorMessage('Invalid password or email');
        }
      })
      .catch((err) => {
        console.log('Error:', err);
      });
  };
  return (
    <div>
      <NavBar />
      <div className='background'>
        <div className='shape'></div>
        <div className='shape'></div>
      </div>
      <form
        className='auth-form login-form'
        onSubmit={(e) => {
          e.preventDefault();
          verifyLogin(e);
        }}
      >
        {errorMessage && <p className='error-message'>{errorMessage}</p>}

        <h3>Login</h3>

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          required
          onChange={(e) => setEmail(e.target.value)}
          autoComplete='off'
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          required
          onChange={(e) => setPassword(e.target.value)}
          autoComplete='off'
        />

        <button className='login-btn' type='submit'>
          Log In
        </button>

        <Link to='/signup'>
          <button className='btn-login'>Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
