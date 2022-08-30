import React from 'react';

const Nav = ({ userName }) => {
    return (
      <div>
        <header>Meet Me in the Middle</header>
        {userName ? <h2>Welcome, {userName}</h2> : ''}
        <button>Log in with Google</button>
      </div>
    )
};

export default Nav;
