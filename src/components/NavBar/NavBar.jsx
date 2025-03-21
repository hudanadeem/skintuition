import { Link } from "react-router-dom";
import { useState } from "react";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import profileIcon from "../../assets/Icons/user.png";
import "./NavBar.scss";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulate authentication state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown menu

  const handleLogout = () => {
    setIsLoggedIn(false); // Simulate logout
    setIsDropdownOpen(false); // Close dropdown
  };

  return (
    <div className="nav">
      {/* Logo (Left) */}
      <div className="nav__left">
        <Link to="/">
          <img className="nav__logo" src={brandLogo} alt="Brand Logo" />
        </Link>
      </div>

      {/* Navigation Links (Center/Right) */}
      <div className="nav__links">
        {/* Glossary */}
        <Link to="/glossary">
          <button className="nav__button" role="button">
            Glossary
          </button>
        </Link>

        {/* Skin Quiz */}
        <Link to="/quiz">
          <button className="nav__button" role="button">
            Quiz
          </button>
        </Link>

        {/* Profile/Account (Conditional Rendering) */}
        <div className="nav__profile">
          {isLoggedIn ? (
            // If logged in, show profile icon with dropdown
            <div className="nav__profile-dropdown">
              <button
                className="nav__profile-button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <img
                  className="nav__profile-icon"
                  src={profileIcon}
                  alt="Profile Icon"
                />
              </button>
              {isDropdownOpen && (
                <div className="nav__dropdown-menu">
                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          ) : (
            // If logged out, show profile icon linking to login page
            <Link to="/login">
              <button className="nav__profile-button">
                <img
                  className="nav__profile-icon"
                  src={profileIcon}
                  alt="Profile Icon"
                />
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default NavBar;