import React from 'react';
import {
  GoogleLoginButton,
  GithubLoginButton,
  TwitterLoginButton,
  FacebookLoginButton
} from 'react-social-login-buttons';
const Home = () => {
  return (
    <div>
      <h1 className='text-center display-3'>Login</h1>

      <div className='btn-container'>
        <GoogleLoginButton
          onClick={() => window.open('http://localhost:4000/auth/google')}
        />
        <GithubLoginButton
          onClick={() => window.open('http://localhost:4000/auth/github')}
        />
        <TwitterLoginButton
          onClick={() => window.open('http://localhost:4000/auth/twitter')}
        />
        <FacebookLoginButton
          onClick={() => window.open('http://localhost:4000/auth/facebook')}
        />
      </div>
    </div>
  );
};

export default Home;
