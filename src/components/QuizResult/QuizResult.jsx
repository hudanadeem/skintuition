import "./QuizResult.scss"
function QuizResult({ skinType, handleScanNow }) {
    return (
      <div className="quiz-page__result quiz-page__result--visible">
        <h2>Your Skin Type is: {skinType.toUpperCase()}</h2>
        <button
          onClick={handleScanNow}
          className="quiz-page__scan-button"
        >
          Let's Scan Now
        </button>
      </div>
    );
  }
  
  export default QuizResult;