import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./ResultsPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import ScanResults from "../../components/ScanResults/ScanResults";

function ResultsPage() {
  const location = useLocation();
  const results = location.state?.results;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (!results) {
    return (
      <div className="results__page--container">
        <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
        <div className="results__page">
          <h1>No results found</h1>
          <button onClick={() => navigate("/analysis")}>Back to Scan</button>
        </div>
      </div>
    );
  }

  return (
    <div className="results__page--container">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="results__page">
        <ScanResults results={results} />
      </div>
    </div>
  );
}

export default ResultsPage;