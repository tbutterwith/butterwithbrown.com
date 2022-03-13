import React, { useState, useEffect } from 'react';

import './App.css';
import GuestInfoPage from './pages/GuestInfoPage';
import Login from './pages/login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [weddingData, setWeddingData] = useState();

  useEffect(() => {
    if(!weddingData) {
      fetchWeddingData();
    }
  }, [isLoggedIn, weddingData]);

  const fetchWeddingData = async () => {
    const res = await fetch('/.netlify/functions/wedding_data',{
      headers: {
        'Accept': 'application/json'
      }
    });
    setIsLoading(false);

    if (!res.ok) {
      setIsLoggedIn(false);
      return;
    }

    setWeddingData(await res.json());
    setIsLoggedIn(true);
  }


  const render = () => {
    if(isLoading) {
      return '';
    }

    if(isLoggedIn && weddingData) {
      return <GuestInfoPage guestInfo={weddingData} />
    }

    return <Login onSuccessfulLogin={() => setIsLoggedIn(true)}/>
  }

  return (
    <div className="AppWrapper">
      {render()}
    </div>
  );
}

export default App;
