import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./QuizPage.scss";
import NavBar from "../../components/NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import QuizContent from "../../components/QuizContent/QuizContent";
import DeterminingSkinType from "../../components/DeterminingSkinType/DeterminingSkinType";
import QuizResult from "../../components/QuizResult/QuizResult";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skinType, setSkinType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [determiningSkinType, setDeterminingSkinType] = useState(false);
  const [fadeOutLoading, setFadeOutLoading] = useState(false);
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_API_URL;
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
        const response = await axios.get(`${baseURL}/api/skin-type/questions`);
        setQuestions(response.data);
      } catch (err) {
        setError(err.message || "Failed to fetch questions");
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
      setDeterminingSkinType(true);
      setLoading(true);

      const response = await axios.post(
        `${baseURL}/api/skin-type`,
        { answers },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setTimeout(() => {
        setFadeOutLoading(true);
        setTimeout(() => {
          setSkinType(response.data.skinType);
          setDeterminingSkinType(false);
          setFadeOutLoading(false);
        }, 500);
      }, 1500);
    } catch (err) {
      setError(err.message || "Failed to determine skin type");
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
          <QuizContent
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            answers={answers}
            handleAnswerSelect={handleAnswerSelect}
            handleSubmit={handleSubmit}
            questionRef={questionRef}
          />
        )}

        {/* Show loading state while determining skin type */}
        {determiningSkinType && (
          <DeterminingSkinType fadeOutLoading={fadeOutLoading} />
        )}

        {/* Show result section when skinType is set */}
        {skinType && (
          <QuizResult skinType={skinType} handleScanNow={handleScanNow} />
        )}
      </div>
    </div>
  );
}

export default QuizPage;
