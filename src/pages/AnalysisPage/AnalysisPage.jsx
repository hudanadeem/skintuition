import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AnalysisPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import ImageUpload from "../../components/ImageUpload/ImageUpload";
import ScanResults from "../../components/ScanResults/ScanResults";

function AnalysisPage() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const resultsRef = useRef(null);

  const baseURL = import.meta.env.VITE_API_URL;


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
      setFileName(file.name);
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
        `${baseURL}/api/analyze`,
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

        <ImageUpload onImageUpload={handleImageUpload} fileName={fileName} />

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

        <button
          onClick={handleScan}
          disabled={isLoading}
          className="analysis-page__scan-button"
        >
          {isLoading ? "Scanning..." : "Scan"}
        </button>

        {results && <ScanResults results={results} resultsRef={resultsRef} />}
      </div>
    </div>
  );
}

export default AnalysisPage;
