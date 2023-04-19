import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { Link } from 'react-router-dom';

import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const verifyLogin = (e) => {
    fetch('/api')
      .then((data) => data.json())
      .then((res) => {
        console.log(res);
        navigate('/dashboard');
      });
  };
  //   const verifyLogin = (e) => {
  //   const userData = {
  //     email,
  //     password,
  //   };
  //   fetch('/verifyUser', {
  //     method: 'POST',
  //     headers: { 'Content-type': 'application/json' },
  //     body: JSON.stringify(userData),
  //   })
  //     .then((response) => response.json())
  //     .then((response) => {
  //       if (response.status === 200) {
  //         navigate('/dashboard');
  //       } else {
  //         alert('wrong email or password');
  //       }
  //     })
  //     .catch((err) => {
  //       console.log('Error:', err);
  //     });

  return (
    <div>
      <NavBar />
      <div className='background'>
        <div className='shape'></div>
        <div className='shape'></div>
      </div>
      <form className='auth-form login-form'>
        <h3>Login</h3>

        <label htmlFor='email'>Email</label>
        <input
          type='text'
          id='email'
          onChange={(e) => setEmail(e.target.value)}
          autocomplete='off'
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          autocomplete='off'
        />

        <button
          className='login-btn'
          type='submit'
          onClick={(e) => {
            e.preventDefault();
            verifyLogin(e);
          }}
        >
          Log In
        </button>

        <Link to='/signup'>
          <button className='login-btn'>Sign Up</button>
        </Link>
      </form>
    </div>
  );
};

export default Login;
