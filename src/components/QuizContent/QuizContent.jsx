import "./QuizContent.scss";

function QuizContent({
  questions,
  currentQuestionIndex,
  answers,
  handleAnswerSelect,
  handleSubmit,
  questionRef,
}) {
  return (
    <div className="quiz__content">
      {questions.slice(0, currentQuestionIndex + 1).map((question, index) => (
        <div
          key={index}
          className="quiz__question"
          ref={index === currentQuestionIndex ? questionRef : null}
        >
          <h3>{question.question}</h3>
          <div className="quiz__options">
            {question.options.map((option, i) => (
              <button
                key={i}
                onClick={() => handleAnswerSelect(index, i + 1)}
                className="quiz__option--button"
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
          <button onClick={handleSubmit} className="quiz__submit--button">
            Submit
          </button>
        )}
    </div>
  );
}

export default QuizContent;
