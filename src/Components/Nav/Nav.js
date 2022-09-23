import React from 'react';

const Nav = ({ userName }) => {
    return (
      <div>
        {userName ? <h2>Welcome, {userName}</h2> : ''}
      </div>
    )
};

export default Nav;
