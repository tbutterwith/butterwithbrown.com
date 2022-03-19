import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfettiExplosion from '@reonomy/react-confetti-explosion';

import './Login.css';

const littleExplodeProps = {
  force: 0.4,
  duration: 2500,
  particleCount: 100,
  floorHeight: 1000,
  floorWidth: 1000,
};

const Login = () => {
  const [password, setPassword] = useState('');
  const [isExploding, setIsExploding] = useState(false);
  const [passwordIncorrect, setPasswordIncorrect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      await auth();
      setPasswordIncorrect(false);
      setIsExploding(true);
      setTimeout(() => {
        setIsExploding(false);
        navigate('/');
      }, 2000);
    } catch (e) {
      setPasswordIncorrect(true);
    }
  };

  const auth = async () => {
    const params = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    };
    const res = await fetch('/.netlify/functions/auth', params);

    if (res.status !== 200) {
      throw new Error('Failed Auth');
    }
  };

  return (
    <div className="Login">
      <h1>👋</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button>
          {isExploding && (
            <div>
              <ConfettiExplosion {...littleExplodeProps} />
            </div>
          )}
          Login
        </button>
      </form>
      {passwordIncorrect ? (
        <div className="incorrect-password">Incorrect password</div>
      ) : (
        ''
      )}
    </div>
  );
};

export default Login;
