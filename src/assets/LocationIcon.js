import React, { useEffect, useState, useImperativeHandle } from 'react';

export const LocationIcon = React.forwardRef(({handleLocation, unselectMarker, Icon, ...props}, ref) => {
  const [iconColor, setIconColor] = useState("grey");
  const handleClick = (e) => {
    handleLocation()
    setIconColor("black")
  }


  if (unselectMarker === true && iconColor !== 'grey') {
     setIconColor("grey")
  }

  return (
  <div onClick={(e) => handleClick(e)} {...props} ref={ref}>
    <Icon iconColor={iconColor}/>
  </div>
  )
});

