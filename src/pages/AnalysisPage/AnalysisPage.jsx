import { useState, useEffect , useRef} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AnalysisPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import photoIcon from "../../assets/icons/upload.png"; // Import your custom icon


function AnalysisPage() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState(""); // State for file name
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

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
      setFileName(file.name); // Set the file name
    }
  };

  const handleScan = async () => {
    if (!image) {
      setError("Please upload an image.");
      return;
    }

    setIsLoading(true);
    setIsScanning(true);
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
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
      
    } catch (error) {
      console.error("Error scanning image:", error);
      setError("Failed to scan image. Please try again.");
    } finally {
      setIsLoading(false);
      setIsScanning(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="page__container--analysis">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="analysis-page">
        <h1 className="analysis-page__title">Scan Your Product</h1>
        {error && <p className="analysis-page__error">{error}</p>}

        {/* Image Upload */}
        <div className="analysis-page__upload">
          <div className="analysis-page__upload-group">
            <div className="analysis-page__upload-icon">
              <img
                src={photoIcon}
                alt="Upload Icon"
                className="analysis-page__upload-icon-img"
              />
            </div>

            <input
              type="text"
              readOnly
              value={fileName}
              placeholder="Upload Image"
              className="analysis-page__upload-input"
            />

            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={handleImageUpload}
              className="analysis-page__upload-hidden"
            />

            <button
              type="button"
              className="analysis-page__upload-browse"
              onClick={() => document.getElementById("image-upload").click()}
            >
              Browse
            </button>
          </div>
        </div>

        {/* Image Preview */}
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
          <div className="analysis-page__results" ref={resultsRef}>
            <h2 className="analysis-page__results-title">Scan Results</h2>

            {[
              { label: "Beneficial Ingredients", data: results.beneficial },
              {
                label: "Potential Irritants",
                data: results.potentialIrritants,
              },
              { label: "Harmful Ingredients", data: results.harmful },
            ].map((section, i) => (
              <div key={i} className="analysis-page__results-section">
                <h3>{section.label}</h3>
                {section.data && section.data.length > 0 ? (
                  <div className="analysis-page__results-bubbles">
                    {section.data.map((ingredient, index) => (
                      <div
                        key={index}
                        className="analysis-page__bubble"
                        style={{ animationDelay: `${index * 800}ms` }}
                      >
                        <div className="analysis-page__bubble-inner">
                          <div className="analysis-page__bubble-front">
                            {ingredient.name}
                          </div>
                          <div className="analysis-page__bubble-back">
                            {ingredient.description}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No {section.label.toLowerCase()} detected.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AnalysisPage;
