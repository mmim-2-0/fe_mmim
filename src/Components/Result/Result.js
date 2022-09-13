import React from 'react';

const Result = ({ info }) => {
    return (
      <div>
        <img src={info.photos[0]}/>
        <h2>{info.name}</h2>
        <p>{info.review_count} ratings</p>
        <p>{info.categories.join(', ')}</p>
        <p>{info.price}</p>
        <p>{info.address}</p>
        {!info.is_open_now ? <p>Currently Closed</p> : <p>Currently Open</p>}
        <button>Meet here</button>
      </div>
    )
};

export default Result;
