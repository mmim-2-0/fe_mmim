import { useEffect, useState } from 'react';

const RestaurantIcon = ({ setSearchCategory, searchCategory }) => {

  const [iconColor, setIconColor] = useState("green");

  const handleClick = (e) => {
    setSearchCategory("restaurant")
  };

  useEffect(() => {
    if (searchCategory === 'restaurant') {
      setIconColor("green")
    } else {
      setIconColor("black")
    }
  }, [searchCategory]);

  return (
    <div onClick={(e) => handleClick(e)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 72 63.7" fill={iconColor}>
        <g id="Restaurant_icon" data-name="Restaurant icon" transform="translate(-1358 -568.3)">
          <path id="restaurant_FILL0_wght100_GRAD0_opsz48" d="M15.4,42.7V24.65a5.691,5.691,0,0,1-3.9-1.85,5.9,5.9,0,0,1-1.6-4.2V5.3H11V18.6h4.4V5.3h1.1V18.6h4.35V5.3h1.1V18.6a5.9,5.9,0,0,1-1.6,4.2,5.644,5.644,0,0,1-3.85,1.85V42.7Zm18.2,0v-16H29.1V13.6a10.119,10.119,0,0,1,1.4-5.325A6.024,6.024,0,0,1,34.7,5.4V42.7Z" transform="translate(1372.1 563)"/>
          <text id="restaurant" transform="translate(1358 628)" fontSize="14" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">restaurant</tspan></text>
        </g>
      </svg>
    </div>
  )
};

export default RestaurantIcon;