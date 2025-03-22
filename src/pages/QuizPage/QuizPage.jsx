import React, { useState, useEffect, useRef } from "react";
import "./QuizPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skinType, setSkinType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const navigate = useNavigate();

  // Create a ref for the question container
  const questionRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/quiz" } });
    } else {
      setIsLoggedIn(true); // Set isLoggedIn to true if token exists
    }
  }, [navigate]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "http://localhost:8080/api/skin-type/questions"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch questions");
        }
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // Scroll to the new question whenever currentQuestionIndex changes
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({
        behavior: "smooth", // Smooth scrolling
        block: "start", // Align to the top of the container
      });
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);

    if (index === currentQuestionIndex && index < questions.length - 1) {
      setCurrentQuestionIndex(index + 1); // Move to the next question
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (answers.length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:8080/api/skin-type", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ answers }),
      });
      if (!response.ok) {
        throw new Error("Failed to determine skin type");
      }
      const data = await response.json();
      setSkinType(data.skinType);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScanNow = () => {
    navigate("/analysis"); // Navigate to the /analysis page
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setIsLoggedIn(false); // Update login status
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return <div className="quiz-page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="quiz-page__error">{error}</div>;
  }

  return (
    <div className="page__container">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} /> {/* Pass props to NavBar */}
      <div className="quiz-page">
        <h1 className="quiz-page__title">Skin Type Quiz</h1>
        {!skinType && questions.length > 0 && ( // Render questions only if skinType is not set
          <div className="quiz-page__content">
            {questions
              .slice(0, currentQuestionIndex + 1)
              .map((question, index) => (
                <div
                  key={index}
                  className="quiz-page__question"
                  ref={index === currentQuestionIndex ? questionRef : null} // Attach ref to the current question
                >
                  <h3>{question.question}</h3>
                  <div className="quiz-page__options">
                    {question.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswerSelect(index, i + 1)}
                        className="quiz-page__option-button"
                        disabled={answers[index] !== undefined}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

            {currentQuestionIndex === questions.length - 1 &&
              answers[questions.length - 1] !== undefined && (
                <button
                  onClick={handleSubmit}
                  className="quiz-page__submit-button"
                >
                  Submit
                </button>
              )}
          </div>
        )}

        {/* Render result section when skinType is set */}
        {skinType && (
          <div className="quiz-page__result">
            <h2>Your Skin Type is: {skinType.toUpperCase()}</h2>
            <button
              onClick={handleScanNow}
              className="quiz-page__scan-button"
            >
              Let's Scan Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizPage;