import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/AuthService';
import '../styles/loginComponent.css';
import { useAuth } from '../context/AuthContext';

const LoginRegisterForm = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const { dispatch } = useAuth();



  const handleLogin = () => {
    authService
      .login({ username, password })
      .then(response => {
        localStorage.setItem('username', username);
        dispatch({ type: 'LOGIN_USER' });
        navigate('/');
      })
      .catch(error => {
        if (error.response.data.errorMessage) {
          setErrors({ _error: error.response.data.errorMessage });
        } else {
          setErrors(error.response.data);
        }
        console.log(error.response.data);
      });
  };

  const handleRegister = () => {
    authService
      .register({ username, password, email })
      .then(response => {
        setSuccessMessage('Registration successful! Please login.');
        setIsLogin(true);
      })
      .catch(error => {
        if (error.response.data.errorMessage) {
          setErrors({ _error: error.response.data.errorMessage });
        } else {
          setErrors(error.response.data);
        }
        console.log(error.response.data);
      });
  };



  const toggleForm = () => {
    setErrors({});
    setSuccessMessage('');
    setIsLogin(!isLogin);
    setUsername('');
    setPassword('');
    setEmail('');
  };

  const handleInputChange = event => {
    const { name, value } = event.target;
    setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    if (name === 'username') setUsername(value);
    else if (name === 'password') setPassword(value);
    else if (name === 'email') setEmail(value);
  };

  return (

    <div className="login-page">
      <div className="login-container">
        <h1 className="login-title">{isLogin ? 'Reddit Login' : 'Reddit Register'}</h1>
        {errors._error && <div className="error-message">{errors._error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}
        <div className="input-container">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={handleInputChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <div className="input-error-message">{errors.username}</div>}
        </div>
        <div className="input-container">
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleInputChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <div className="input-error-message">{errors.password}</div>}
        </div>
        {!isLogin && (
          <div className="input-container">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="input-error-message">{errors.email}</div>}
          </div>
        )}
        <button className="login-button" onClick={isLogin ? handleLogin : handleRegister}>
          {isLogin ? 'Login' : 'Register'}
        </button>
        <p className="register-link" onClick={toggleForm}>
          {isLogin ? 'Register' : 'Login'}
        </p>
        <Link to="/">Go to Home Page</Link>
      </div>
    </div>

  );
};

export default LoginRegisterForm;
