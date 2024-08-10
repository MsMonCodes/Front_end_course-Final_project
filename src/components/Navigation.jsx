import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Upcoming events</Link>
        </li>
        {/* <li>
          <Link to="/event/1">Event detials</Link>
        </li> */}
        <li>
          <Link to="/event/new">Add event</Link>
        </li>
      </ul>
    </nav>
  );
};