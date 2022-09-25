const CafeIcon = ({ setSearchCategory }) => {

  return (
    <div onClick={() => setSearchCategory("cafe")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 37 63">
        <g id="Cafe_icon" data-name="Cafe icon" transform="translate(-1293 -569)">
          <path id="local_cafe_FILL0_wght400_GRAD0_opsz48" d="M8,42V39H39.95v3Zm7.55-6a7.325,7.325,0,0,1-5.35-2.175A7.2,7.2,0,0,1,8,28.5V6H41a2.988,2.988,0,0,1,3,3v8a2.988,2.988,0,0,1-3,3H36.2v8.5A7.2,7.2,0,0,1,34,33.825,7.325,7.325,0,0,1,28.65,36Zm0-3h13.1a4.361,4.361,0,0,0,3.175-1.375A4.307,4.307,0,0,0,33.2,28.5V9H11V28.5a4.272,4.272,0,0,0,1.4,3.125A4.389,4.389,0,0,0,15.55,33ZM36.2,17H41V9H36.2ZM22.1,21Z" transform="translate(1286 563)"/>
          <text id="cafe" transform="translate(1308 628)" fontSize="16" fontFamily="SegoeUI, Segoe UI"><tspan x="-14" y="0">cafe</tspan></text>
        </g>
      </svg>
    </div>
  )
}
export default CafeIcon;