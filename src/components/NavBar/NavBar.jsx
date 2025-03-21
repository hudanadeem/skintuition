import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import brandLogo from "../../assets/logos/skintuition_logo.png";
import profileIcon from "../../assets/Icons/user-profile.png";
import loggedInIcon from "../../assets/Icons/logged-in.png";
import "./NavBar.scss";

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setIsLoggedIn(false); 
    setIsDropdownOpen(false); 
  };

  return (
    <div className="nav">
      <div className="nav__left">
        <Link to="/">
          <img className="nav__logo" src={brandLogo} alt="Brand Logo" />
        </Link>
      </div>

      <div className="nav__links">
        <Link to="/glossary">
          <button className="nav__button" role="button">
            Glossary
          </button>
        </Link>
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
                  src={loggedInIcon} // Use different icon when logged in
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
