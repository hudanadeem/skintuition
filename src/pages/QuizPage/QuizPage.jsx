import React, { useState, useEffect } from "react";
import "./QuizPage.scss";

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [skinType, setSkinType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:8080/api/skin-type/questions");
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

  const handleAnswerSelect = (answer) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = answer;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
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

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setSkinType(null);
    setError("");
  };

  if (loading) {
    return <div className="quiz-page__loading">Loading...</div>;
  }

  if (error) {
    return <div className="quiz-page__error">{error}</div>;
  }

  if (skinType) {
    return (
      <div className="quiz-page__result">
        <h2>Your Skin Type is: {skinType.toUpperCase()}</h2>
        <button onClick={handleRestart} className="quiz-page__restart-button">
          Take the Quiz Again
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page">
      <h1 className="quiz-page__title">Skin Type Quiz</h1>
      {questions.length > 0 && (
        <div className="quiz-page__content">
          <div className="quiz-page__progress">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
          <div className="quiz-page__question">
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div className="quiz-page__options">
              {questions[currentQuestionIndex].options.map((option, index) => (
                <button key={index} onClick={() => handleAnswerSelect(index + 1)} className="quiz-page__option-button">
                  {option}
                </button>
              ))}
            </div>
          </div>
          {currentQuestionIndex === questions.length - 1 && (
            <button onClick={handleSubmit} className="quiz-page__submit-button">
              Submit
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizPage;
