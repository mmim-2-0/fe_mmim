import { useEffect, useState } from 'react';
const Marker = (handleCurrentLocation) => {

  const handleClick = (e) => {
    handleCurrentLocation()
  };

  return (
  <div onClick={(e) => handleClick(e)}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="29" width="29">
    <rect width="256" height="256" fill="none"></rect>
    <path d="M200,224H150.5A253.6,253.6,0,0,0,174,200.2c27.5-31.5,42-64.8,42-96.2a88,88,0,0,0-176,0c0,31.4,14.5,64.7,42,96.2A253.6,253.6,0,0,0,105.5,224H56a8,8,0,0,0,0,16H200a8,8,0,0,0,0-16ZM128,72a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z" id="mainIconPathAttribute"></path>
    </svg>
  </div>
  )
};

export default Marker;