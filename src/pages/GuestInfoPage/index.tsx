import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GuestInfo, Itinerary } from '../../types/data';
import Header from '../../components/header';

import './GuestInfoPage.css';

const renderSchedule = (schedule: Itinerary) => {
  const times = schedule.map(({ time, description }, index) => (
    <tr key={index}>
      <td>{time}</td>
      <td>{description}</td>
    </tr>
  ));

  return (
    <>
      <h2 id="schedule">Schedule</h2>
      <table className="GuestInfoPage_ScheduleTable">
        <tbody>{times}</tbody>
      </table>
    </>
  );
};

const renderAddress = (address: ReadonlyArray<string>) => {
  return address.map((line) => (
    <>
      {line}
      <br />
    </>
  ));
};

const renderIntro = (intro: ReadonlyArray<string>) => {
  return intro.map((line) => <p>{line}</p>);
};

const GuestInfoPage = () => {
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
      <div className="GuestInfoPage_intro">
        {renderIntro(weddingData.intro)}
      </div>
      <img
        src="8c05805e-da7f-4cfc-a37f-fc32947d52c4.jpg"
        alt="Ellie and Tom on the beach"
      />
      <div className="GuestInfoPage_Schedule">
        {renderSchedule(weddingData.itinerary)}
      </div>
      <div className="portrait-img-holder">
        <img
          src="1f84608e-10b9-4cf9-86fc-11d3cb551b0b.jpg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
        <img
          src="75356c63-23f4-4b7a-84de-ce76b7ff66f0.jpg"
          alt="Ellie and Tom eating ice cream"
          className="portrait"
        />
      </div>
      <div className="GuestInfoPage_Address">
        <h2>Address</h2>
        <p>{renderAddress(weddingData.address)}</p>
        <p>
          For directions see our{' '}
          <Link to={'directions'} className="inline-link">
            dedicated page.
          </Link>
        </p>
      </div>
      <img
        src="df4e233b-622b-4a27-9aee-136b8dd0dd4c.jpg"
        alt="Ellie and Tom on Worthing promenade"
      />
    </div>
  );
};

export default GuestInfoPage;
