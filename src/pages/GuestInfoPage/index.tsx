import { GuestInfo, Itinerary } from "../../types/data";

import './GuestInfoPage.css';

interface Props {
  guestInfo: GuestInfo
}

const renderSchedule = (schedule: Itinerary) => {
  const times = schedule.map(({time, description}) => 
    <tr>
      <td>{time}</td>
      <td>{description}</td>
    </tr>
  );
  
  return (
    <>
    <h2>Schedule</h2>
    <table className="GuestInfoPage_ScheduleTable">
      <tbody>
        {times}
      </tbody>
    </table>
    </>
  );
}

const renderDirections = (directions: ReadonlyArray<string>) => {
  return directions.map(line => <p>{line}</p>);
}

const renderAddress = (address: ReadonlyArray<string>) => {
  return address.map(line => <>{line}<br/ ></>);
}

const GuestInfoPage = ({ guestInfo }:Props) => (
  <div className="GuestInfoPage_Wrapper">
    <h1>Tom and Ellie</h1>
    <div className="GuestInfoPage_Links">
      <a>RSVP</a>
      <a style={{whiteSpace: 'nowrap'}}>Wedding List</a>
      <a>Schedule</a>
      <a>Directions</a>
    </div>
    <img src="8c05805e-da7f-4cfc-a37f-fc32947d52c4.jpg" />
    <div className="GuestInfoPage_Schedule">
      {renderSchedule(guestInfo.itinerary)}
    </div>
    <img src="901b741b-94cd-4681-b3e6-f9bb388324a1.jpg" />
    <div className="GuestInfoPage_Directions">
      <h2>Directions</h2>
      {renderDirections(guestInfo.directions)}
      <h3>Address</h3>
      <p>{renderAddress(guestInfo.address)}</p>
    </div>
    <img src="1f84608e-10b9-4cf9-86fc-11d3cb551b0b.jpg" />
  </div>
);

export default GuestInfoPage;