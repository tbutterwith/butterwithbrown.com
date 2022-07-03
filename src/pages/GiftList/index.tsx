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
          Just being there to celebrate with us is a gift in itself so please
          don't feel like you need to buy us anything.
        </p>
        <p>
          But if you would like to get us a gift we have a gift list with{' '}
          <a href={weddingData.weddingListUrl} target="_blank">
            John Lewis, available here
          </a>
          . There will be somewhere to place gifts on the day or if you're
          travelling from afar, feel free to get it delivered to our home. Our
          address is {renderDeliveryAddress(weddingData.deliveryAddress)}.
        </p>
        <p>
          Alternatively, we're saving for a{' '}
          <a
            href="https://www.bramwellbrown.com/collections/weather-clocks/products/weather-clock-small?variant=4002828357"
            target="_blank"
          >
            Bramwell Brown Weather Clock
          </a>{' '}
          to mark the occasion and try to help us make sense of the Scottish
          weather. If you'd like to contribute to that, we'll have a little
          postbox for cards at the venue on the day.
        </p>
        <p>Thank you again for joining us on our special day :)</p>
      </div>
      <img
        src="f65af9d8-7c8f-4aa6-b6b8-06d437926d8a.jpg"
        alt="Ellie and Tom eating ice cream"
        className="portrait"
      />
    </div>
  );
};
export default GiftList;
