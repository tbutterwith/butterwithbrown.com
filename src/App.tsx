import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import './App.css';
import GuestInfoPage from './pages/GuestInfoPage';
import Login from './pages/login';
import Directions from './pages/Directions';
import GiftList from './pages/GiftList';
import RSVP from './pages/Rsvp';

function App() {
  return (
    <div className="AppWrapper">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GuestInfoPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/directions" element={<Directions />} />
          <Route path="/gift-list" element={<GiftList />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
