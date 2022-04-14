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
      <h1 className={className}>
        <Link to="/">Tom and Ellie</Link>
      </h1>
      {subHeading ? <h3 id="Subheading">🍃 {subHeading} 🍃</h3> : ''}
      <div className="Header_Links">
        <a href="/">RSVP</a>
        <Link to="/">Guest Info</Link>
        <Link to="/directions">Directions</Link>
        <a href="/" style={{ whiteSpace: 'nowrap' }}>
          Wedding List
        </a>
      </div>
    </>
  );
};

export default Header;
