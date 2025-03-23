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
  const [determiningSkinType, setDeterminingSkinType] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false); // New state for fade-out
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const questionRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", { state: { from: "/quiz" } });
    } else {
      setIsLoggedIn(true);
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

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [currentQuestionIndex]);

  const handleAnswerSelect = (index, answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = answer;
    setAnswers(updatedAnswers);

    if (index === currentQuestionIndex && index < questions.length - 1) {
      setCurrentQuestionIndex(index + 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answers.length !== questions.length) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setDeterminingSkinType(true); // Start determining skin type
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

      // Simulate a delay for processing
      setTimeout(() => {
        setFadeOutLoading(true); // Start fading out the loading state
        setTimeout(() => {
          setSkinType(data.skinType);
          setDeterminingSkinType(false);
          setFadeOutLoading(false); // Reset fade-out state
        }, 500); // Wait for fade-out to complete
      }, 1500); // 1.5-second delay for processing
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleScanNow = () => {
    navigate("/analysis");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  if (loading) {
    return <div className="quiz-page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="quiz-page__error">{error}</div>;
  }

  return (
    <div className="page__container">
      <NavBar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="quiz-page">
        <h1 className="quiz-page__title">Skin Type Quiz</h1>

        {/* Show quiz content only if not determining skin type and skinType is not set */}
        {!determiningSkinType && !skinType && questions.length > 0 && (
          <div className="quiz-page__content">
            {questions
              .slice(0, currentQuestionIndex + 1)
              .map((question, index) => (
                <div
                  key={index}
                  className="quiz-page__question"
                  ref={index === currentQuestionIndex ? questionRef : null}
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

        {/* Show loading state while determining skin type */}
        {determiningSkinType && (
          <div
            className={`quiz-page__determining ${
              fadeOutLoading ? "quiz-page__determining--fade-out" : ""
            }`}
          >
            <div className="quiz-page__spinner"></div>
            <p>Determining your skin type...</p>
          </div>
        )}

        {/* Show result section when skinType is set */}
        {skinType && (
          <div className="quiz-page__result quiz-page__result--visible">
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