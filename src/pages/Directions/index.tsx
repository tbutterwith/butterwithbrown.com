import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';

import { Directions, GettingThere } from '../../types/data';

const renderAddress = (address: ReadonlyArray<string>) => {
  return address.map((line) => (
    <>
      {line}
      <br />
    </>
  ));
};

const renderGettingThere = (gettingThere: ReadonlyArray<GettingThere>) => {
  return gettingThere.map(({ title, text }) => (
    <>
      <h4>{title}</h4>
      <p>{text}</p>
    </>
  ));
};

const DirectionsPage = () => {
  const [directions, setDirections] = useState<Directions>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!directions) {
      fetchDirectionsData();
    }
  }, [directions]);

  const fetchDirectionsData = async () => {
    const res = await fetch('/.netlify/functions/directions', {
      headers: {
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      navigate('/login');
      return;
    }

    setDirections(await res.json());
  };

  if (!directions) {
    return <></>;
  }

  return (
    <div className="PageWrapper">
      <Header />
      <div dangerouslySetInnerHTML={{ __html: directions.intro }}></div>
      <img
        src="8c05805e-da7f-4cfc-a37f-fc32947d52c4.jpg"
        alt="Ellie and Tom on the beach"
      />
      <div className="Directions_address">
        <h3>Address</h3>
        <p>{renderAddress(directions.address)}</p>
        <p>{directions.access}</p>
      </div>
      <hr id="hr" />
      <div>
        <h3>Getting There</h3>
        {renderGettingThere(directions.gettingThere)}
        <img
          src="1f84608e-10b9-4cf9-86fc-11d3cb551b0b.jpg"
          alt="Ellie and Tom eating ice cream"
        />
      </div>
    </div>
  );
};

export default DirectionsPage;
