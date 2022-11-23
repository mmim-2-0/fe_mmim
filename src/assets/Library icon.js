import { useEffect, useState } from "react";

const LibraryIcon = ({ setSearchCategory, searchCategory }) => {
  const [iconColor, setIconColor] = useState("green");

  const handleClick = (e) => {
    setSearchCategory("library");
  };

  useEffect(() => {
    if (searchCategory === "library") {
      setIconColor("green");
    } else {
      setIconColor("black");
    }
  }, [searchCategory]);

  return (
    <div onClick={(e) => handleClick(e)}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='60'
        height='50'
        viewBox='0 0 45 66'
        fill={iconColor}
      >
        <g
          id='Library_icon'
          data-name='Library icon'
          transform='translate(-1541 -566)'
        >
          <path
            id='local_library_FILL0_wght400_GRAD0_opsz48'
            d='M24,45a29.143,29.143,0,0,0-8.525-5.3A25.3,25.3,0,0,0,6,37.85V16.4a21.936,21.936,0,0,1,9.325,2.15,32.442,32.442,0,0,1,8.675,6,32.442,32.442,0,0,1,8.675-6A21.936,21.936,0,0,1,42,16.4V37.85a25.3,25.3,0,0,0-9.475,1.85A29.143,29.143,0,0,0,24,45Zm0-3.85a35.066,35.066,0,0,1,7.325-4.075A28.049,28.049,0,0,1,39,35.15V19.65a21.348,21.348,0,0,0-7.175,2.725A42.042,42.042,0,0,0,24,28.4a47.844,47.844,0,0,0-8-6.15,19.624,19.624,0,0,0-7-2.6v15.5a28.049,28.049,0,0,1,7.675,1.925A35.067,35.067,0,0,1,24,41.15Zm.15-23.75a7.6,7.6,0,0,1-7.7-7.7A7.6,7.6,0,0,1,24.15,2a7.6,7.6,0,0,1,7.7,7.7,7.6,7.6,0,0,1-7.7,7.7Zm0-3a4.695,4.695,0,0,0,4.7-4.7,4.53,4.53,0,0,0-1.375-3.325,4.708,4.708,0,0,0-6.65,0A4.53,4.53,0,0,0,19.45,9.7a4.695,4.695,0,0,0,4.7,4.7ZM24.1,9.6ZM24,30.4Z'
            transform='translate(1539 564)'
          />
          <text
            id='library'
            transform='translate(1541 628)'
            fontSize='14'
            fontFamily='SegoeUI, Segoe UI'
          >
            <tspan x='0' y='0'>
              library
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default LibraryIcon;
