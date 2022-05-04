import React from 'react';
import Header from '../../components/header';

const GiftList = () => (
  <div className="PageWrapper">
    <Header />
    <div className="info">
      <h3>Our gift list will open on July 1st.</h3>
      <p>
        This is due to the lavish amount of holidays we've booked and a lack of
        trust in our neighbours to look after any packages left in our hall. We
        hope you understand.
      </p>
    </div>
    <img
      src="d94c4db1-b025-4717-b319-25b4917cc469.jpg"
      alt="Ellie and Tom on the beach"
    />
  </div>
);

export default GiftList;
