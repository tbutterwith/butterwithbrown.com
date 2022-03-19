import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import GuestInfoPage from './pages/GuestInfoPage';
import Login from './pages/login';
import Directions from './pages/Directions';

function App() {
  return (
    <div className="AppWrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestInfoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/directions" element={<Directions />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
