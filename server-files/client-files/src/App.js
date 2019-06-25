import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [initState, changeState] = useState({
    isAuthenticated: false,
    msg: '',
    user: {}
  });

  useEffect(() => {
    fetch('http://localhost:4000/auth', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(res => res.json())
      .then(data =>
        changeState({
          isAuthenticated: data.isAuthenticated,
          user: data.user,
          msg: data.msg
        })
      );
  }, []);

  const handleLogout = e => {
    console.log('Logout initiated');
    fetch('http://localhost:4000/auth/logout', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      }
    })
      .then(res => res.json())
      .then(data =>
        changeState({
          isAuthenticated: data.isAuthenticated,
          user: '',
          msg: data.msg
        })
      );
  };
  console.log(initState);
  return (
    <BrowserRouter>
      <div className='App'>
        <nav class='navbar navbar-expand-lg navbar-dark bg-dark'>
          <a class='navbar-brand' href='#'>
            OAuths
          </a>
          <div class='collapse navbar-collapse'>
            <ul class='navbar-nav mr-auto left'>
              <li class='nav-item'>
                <Link class='nav-link' to='/'>
                  Home
                </Link>
              </li>
              {initState.isAuthenticated && (
                <li class='nav-item'>
                  <Link class='nav-link' to='/profile'>
                    Profile
                  </Link>
                </li>
              )}
              {!initState.isAuthenticated && (
                <li class='nav-item'>
                  <Link class='nav-link' to='/login'>
                    Login
                  </Link>
                </li>
              )}
              {initState.isAuthenticated && (
                <li class='nav-item'>
                  <button class='btn btn-light' onClick={e => handleLogout(e)}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </nav>
        <Switch>
          <Route exact path='/' component={Home} user={initState.user} />
          <Route exact path='/login' component={Login} />
          <PrivateRoute
            isAuthenticated={initState.isAuthenticated}
            path='/profile'
            component={Profile}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
