import { Link } from 'react-router-dom';

import './header.css';

interface Props {
  subHeading?: string;
}

const Header = ({ subHeading }: Props) => {
  let className = '';
  if (subHeading) className = 'WithDate';

  return (
    <>
      <div className="Header_Container">
        <div id="leaf01" />
        <div className="Header_Items">
          <h1 className={className}>
            <Link to="/">Ellie and Tom</Link>
          </h1>
          {subHeading ? <h3 id="Subheading">{subHeading}</h3> : ''}
          <div id="leaf03" />
          <div className="Header_Links">
            <Link to="/rsvp">RSVP</Link>
            <Link to="/">Guest Info</Link>
            <Link to="/directions">Directions</Link>
            <Link to="/gift-list" style={{ whiteSpace: 'nowrap' }}>
              Wedding List
            </Link>
          </div>
        </div>
        <div id="leaf02" />
      </div>
      <hr id="hr" />
    </>
  );
};

export default Header;
