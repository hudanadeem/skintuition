import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AnalysisPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import ImageUpload from "../../components/ImageUpload/ImageUpload";

function AnalysisPage() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.post(`${baseURL}/api/analyze`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      navigate("/results", { state: { results: response.data } });
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
    <div className="analysis__page--container">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="analysis__page">
        <h1 className="analysis__page--title">Scan Your Product</h1>
        {error && <p className="analysis__page--error">{error}</p>}

        <ImageUpload onImageUpload={handleImageUpload} fileName={fileName} />

        {image && (
          <div
            className={`analysis__page--preview ${
              isScanning ? "analysis__page--scanning" : ""
            }`}
          >
            <img
              src={URL.createObjectURL(image)}
              alt="Uploaded"
              className="analysis__page--image"
            />
          </div>
        )}

        <button
          onClick={handleScan}
          disabled={isLoading}
          className="analysis__page--button"
        >
          {isLoading ? "Scanning..." : "Scan"}
        </button>
      </div>
    </div>
  );
}

export default AnalysisPage;