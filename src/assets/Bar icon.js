import { useEffect, useState } from 'react';

const BarIcon = ({ setSearchCategory, searchCategory }) => {

const [iconColor, setIconColor] = useState("green");

  const handleClick = (e) => {
    setSearchCategory("bar")
  }

  useEffect(() => {
    if (searchCategory === 'bar') {
      setIconColor("green")
    } else {
      setIconColor("black")
    }
  }, [searchCategory])
    

  return (
    <div onClick={(e) => handleClick(e)}>
      <svg xmlns="http://www.w3.org/2000/svg" width="60" height="50" viewBox="0 0 36 63" fill={iconColor}>
        <g id="Bar_icon" data-name="Bar icon" transform="translate(-1468 -569)">
          <path id="local_bar_FILL0_wght400_GRAD0_opsz48" d="M12,42V39H22.5V26.8L6,9V6H42V9L25.5,26.8V39H36v3Zm2.05-28.75h19.9L38.1,9.2H9.9ZM24,24.05l7.2-7.8H16.8ZM24,24.05Z" transform="translate(1462 563)"/>
          <text id="bar" transform="translate(1475 628)" fontSize="14" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">bar</tspan></text>
        </g>
      </svg>
    </div>
  )
}
export default BarIcon;