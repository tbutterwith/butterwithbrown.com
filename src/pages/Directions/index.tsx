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
      <Header subHeading={directions.date} />
      <div dangerouslySetInnerHTML={{ __html: directions.intro }}></div>
      <div className="portrait-img-holder">
        <img
          src="ffad669e-847a-4bbc-a96c-e87485c49915.jpeg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
        <img
          src="c83cd25a-16bf-4144-ad88-51adabe08958.jpg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
      </div>
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
          src="04f71290-7327-453d-b48d-321448d8839c.jpg"
          alt="Ellie and Tom eating ice cream"
        />
      </div>
    </div>
  );
};

export default DirectionsPage;
