import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestInfo } from '../../types/data';
import Header from '../../components/header';

const RSVP = () => {
  const [weddingData, setWeddingData] = useState<GuestInfo>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!weddingData) {
      fetchWeddingData();
    }
  }, [weddingData]);

  const fetchWeddingData = async () => {
    const res = await fetch('/.netlify/functions/wedding_data', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      navigate('/login');
      return;
    }

    setWeddingData(await res.json());
  };

  if (!weddingData) {
    return <></>;
  }

  return (
    <div className="PageWrapper">
      <Header subHeading={weddingData.date} />
      <div className="info">
        <p>
          Hello and thank you for RSVP-ing to our wedding! Please fill out{' '}
          <a href={weddingData.rsvpUrl}>our RSVP form</a> by 20th July 2022.
        </p>
        <h3>
          <a href={weddingData.rsvpUrl}>RSVP HERE!</a>
        </h3>
      </div>
      <div className="portrait-img-holder">
        <img
          src="b69dfe06-f291-49f0-970c-8edb9b04a3d9.jpg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
        <img
          src="9873f005-fff7-44b2-98ef-779ffdfa68a6.jpg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
      </div>
    </div>
  );
};

export default RSVP;
