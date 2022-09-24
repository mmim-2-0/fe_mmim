const ParkIcon = ({ setSearchCategory }) => {

  return (
    <div onClick={() => setSearchCategory("park")}>
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="65" viewBox="0 0 36 65">
        <g id="Park_icon" data-name="Park icon" transform="translate(-1622 -567)">
          <path id="park_FILL0_wght400_GRAD0_opsz48" d="M26.9,44H21.15V36.55H6l9.45-13.7H10.7L24,4,37.3,22.85H32.6L42,36.55H26.9ZM11.8,33.55h0Zm0,0H36.25L26.8,19.85h4.45L24,9.55l-7.25,10.3h4.5Z" transform="translate(1616 563)"/>
          <text id="park" transform="translate(1622 628)" fontSize="16" fontFamily="SegoeUI, Segoe UI"><tspan x="0" y="0">park</tspan></text>
        </g>
      </svg>
    </div>
  )
}
export default ParkIcon;