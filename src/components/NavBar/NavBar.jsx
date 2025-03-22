import { Link } from "react-router-dom";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import profileIcon from "../../assets/Icons/user-profile.png";
import DropDown from "../DropDown/DropDown";
import "./NavBar.scss";

function NavBar({ isLoggedIn, handleLogout }) {
  return (
    <nav className="navbar">
      <Link to="/">
        <img className="navbar__logo" src={brandLogo} alt="Brand Logo" />
      </Link>

      <div className="navbar__profile">
        {isLoggedIn ? (
          <DropDown handleLogout={handleLogout} />
        ) : (
          <Link to="/login">
            <button className="navbar__profile-button">
              <img
                className="navbar__profile-icon"
                src={profileIcon}
                alt="Default Profile Icon"
              />
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;