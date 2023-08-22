import React, { useState } from 'react';
import { authRepository } from './repository/auth.repo';
import { useHistory } from 'react-router';
import { DASHBOARD_SUPPLIER } from '../constants/routes.constants';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isDataLoading, setIsDataLoading] = useState(false);
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Username and password are required');
      return;
    }

    // Simulate data loading (replace with actual API call)
    setIsDataLoading(true);
    const params = {
      username: username,
      password: password,
    };
    authRepository
      .login(params)
      .then((res) => {
        if (res.token) {
          console.log(res);
          setIsDataLoading(false);
          localStorage.setItem('JWT', `JWT ${res.token}`);
          history.push(DASHBOARD_SUPPLIER);
        } else setError('Invalid username or password');
      })
      .catch((err) => {
        console.log(err);
        setError('Invalid username or password');
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="form_page">
          <form className="form-signin panel panel-default" onSubmit={handleLogin}>
            <div className="errorMessages">
              {username && !isDataLoading && (
                <span className="help-block">Username is required</span>
              )}
              {password && !isDataLoading && (
                <span className="help-block">Password is required</span>
              )}
              {error && <div className="error">{error}</div>}
            </div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login_footer">
              <span className="password_help">Forgot Password?</span>
              <span className="login_button">
                <button
                  type="submit"
                  className="btn btn-primary UIbutton"
                  disabled={!username || !password || isDataLoading}
                >
                  {isDataLoading ? 'Logging in...' : 'Login'}
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
