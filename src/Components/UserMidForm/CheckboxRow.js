import React from "react";
import "./UserMidForm.css";

export const CheckboxRow = ({ useDefaultAddress, handleCurrentLocation }) => (
  <div className="checkbox-option-container">
    <div className="checkbox-div">
      <input
        id="checkbox"
        type="radio"
        name="checkbox"
        onChange={useDefaultAddress}
      />
      <label className="checkbox-address">🏠 Use default address</label>
    </div>
    <div className="checkbox-div">
      <input
        id="checkbox"
        type="radio"
        name="checkbox"
        onChange={handleCurrentLocation}
      />
      <label className="checkbox-address">📍 Use current location</label>
    </div>
  </div>
);
