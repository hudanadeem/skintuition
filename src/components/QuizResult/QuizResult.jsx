import "./QuizResult.scss"
function QuizResult({ skinType, handleScanNow }) {
    return (
      <div className="quiz__result quiz__result--visible">
        <h2>Your Skin Type is: {skinType.toUpperCase()}</h2>
        <button
          onClick={handleScanNow}
          className="quiz__scan--button"
        >
          Let's Scan Now
        </button>
      </div>
    );
  }
  
  export default QuizResult;