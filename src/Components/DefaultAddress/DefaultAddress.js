import "./DefaultAddress.css";
import { useState } from "react";
import { updateDefaultAddress } from "../../apiCalls";

const DefaultAddress = ({
  token,
  userName,
  userEmail,
  userDefaultAddress,
  setUserDefaultAddress,
  setAddressOne,
}) => {
  const [localDefault, setLocalDefault] = useState(userDefaultAddress);
  const [defaultAddressError, setDefaultAddressError] = useState(false);

  const updateAddress = async ({ newAddress, deleteAddress }) => {
    try {
      await updateDefaultAddress(
        token,
        userName,
        userEmail,
        newAddress,
        deleteAddress
      );

      setUserDefaultAddress(newAddress);
      setAddressOne(newAddress);
      setLocalDefault("");
      setDefaultAddressError(false);
    } catch (err) {
      setDefaultAddressError(true);
    }
  };

  const defaultAddressHandler = async () => {
    await updateAddress({ newAddress: localDefault });
  };

  const deleteAddressHandler = async () => {
    await updateAddress({ deleteAddress: true });
  };

  const handleLocalDefault = (e) => {
    setLocalDefault(e.target.value);
  };

  return (
    <div>
      <h2 className="myinfo-title">My Info</h2>
      <div className="myinfo-container">
        <p className="username">Username: {userName}</p>
        <p className="default-address">
          <strong>Default Address:</strong> {userDefaultAddress}
        </p>
        <h3 className="change-default-title">Update my default address:</h3>
        <input
          className="default-input"
          type="text"
          placeholder="new default address"
          value={localDefault}
          onChange={handleLocalDefault}
        ></input>
        <div className="row">
          <button className="update-button" onClick={defaultAddressHandler}>
            update
          </button>
          <button className="update-button" onClick={deleteAddressHandler}>
            delete
          </button>
        </div>
        {defaultAddressError && (
          <p className="error-message">Please enter a valid address.</p>
        )}
      </div>
    </div>
  );
};

export default DefaultAddress;
