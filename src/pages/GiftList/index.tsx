import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GuestInfo } from '../../types/data';
import Header from '../../components/header';

const renderDeliveryAddress = (address: ReadonlyArray<string>) => {
  // In line drop trailing comma from last line of address
  const formatted = address.map((line, i) => (
    <>
      {line}
      {i < 2 ? ', ' : ''}
    </>
  ));
  return formatted;
};

const GiftList = () => {
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
      <Header />
      <div className="info">
        <h3>Thank you so much for being part of our day!</h3>
        <p>
          Just being there to celebrate with us is a gift in itself so don't
          feel like you need to buy us anything.
        </p>
        <p>
          If you would like to get us a gift we have a gift list with{' '}
          <a href={weddingData.weddingListUrl}>John Lewis, available here</a>.
          You can either bring it with you on the day, or if you're travelling
          feel free to get it delivered to our flat. Our address is{' '}
          {renderDeliveryAddress(weddingData.deliveryAddress)}.
        </p>
        <img
          style={{ maxWidth: '50%' }}
          src="/weather_clock.png"
          alt="Bramwell Brown Weather Clock"
        />
        <p>
          We're also saving for a Bramwell Brown Weather Clock so if you'd like
          you can contribute to that. We'll have a little postbox for cards at
          the venue on the day.
        </p>
      </div>
      <img
        src="d94c4db1-b025-4717-b319-25b4917cc469.jpg"
        alt="Ellie and Tom on the beach"
      />
    </div>
  );
};
export default GiftList;
