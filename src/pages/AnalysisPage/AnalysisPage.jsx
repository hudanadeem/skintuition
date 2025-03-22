import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AnalysisPage.scss";
import NavBar from "../../components/NavBar/NavBar";

function AnalysisPage() {
  const [image, setImage] = useState(null);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false); // State for scanning animation
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleScan = async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setIsLoading(true);
    setIsScanning(true); // Start scanning animation
    setError("");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/analyze",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setResults(response.data);
    } catch (error) {
      console.error("Error scanning image:", error);
      setError("Failed to scan image. Please try again.");
    } finally {
      setIsLoading(false);
      setIsScanning(false); // Stop scanning animation
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="page__container">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="analysis-page">
        <h1 className="analysis-page__title">Scan Your Product</h1>
        {error && <p className="analysis-page__error">{error}</p>}

        {/* Image Upload */}
        <div className="analysis-page__upload">
          <label htmlFor="image-upload" className="analysis-page__upload-label">
            Upload Image
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageUpload}
            className="analysis-page__upload-input"
          />
          {image && (
            <div
              className={`analysis-page__image-preview ${
                isScanning ? "analysis-page__upload-scanning" : ""
              }`}
            >
              <img
                src={URL.createObjectURL(image)}
                alt="Uploaded"
                className="analysis-page__image"
              />
            </div>
          )}
        </div>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={isLoading}
          className="analysis-page__scan-button"
        >
          {isLoading ? "Scanning..." : "Scan"}
        </button>

        {/* Results Display */}
        {results && (
          <div className="analysis-page__results">
            <h2 className="analysis-page__results-title">Scan Results</h2>

            {/* Beneficial Ingredients */}
            <div className="analysis-page__results-section">
              <h3>Beneficial Ingredients</h3>
              {results.beneficial && results.beneficial.length > 0 ? (
                <ul>
                  {results.beneficial.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.name}</strong>: {ingredient.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No beneficial ingredients detected.</p>
              )}
            </div>

            {/* Potential Irritants */}
            <div className="analysis-page__results-section">
              <h3>Potential Irritants</h3>
              {results.potentialIrritants &&
              results.potentialIrritants.length > 0 ? (
                <ul>
                  {results.potentialIrritants.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.name}</strong>: {ingredient.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No potential irritants detected.</p>
              )}
            </div>

            {/* Harmful Ingredients */}
            <div className="analysis-page__results-section">
              <h3>Harmful Ingredients</h3>
              {results.harmful && results.harmful.length > 0 ? (
                <ul>
                  {results.harmful.map((ingredient, index) => (
                    <li key={index}>
                      <strong>{ingredient.name}</strong>: {ingredient.description}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No harmful ingredients detected.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;