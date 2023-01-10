import BarIcon from "../../assets/Bar icon.js";
import CafeIcon from "../../assets/Cafe icon.js";
import LibraryIcon from "../../assets/Library icon.js";
import ParkIcon from "../../assets/Park icon.js";
import RestaurantIcon from "../../assets/Restaurant icon.js";
import "./UserMidForm.css";

export const IconRow = (props) => (
  <div className="category-icons">
    <CafeIcon {...props} />
    <RestaurantIcon {...props} />
    <BarIcon {...props} />
    <LibraryIcon {...props} />
    <ParkIcon {...props} />
  </div>
);
