import "./DeterminingSkinType.scss"
function DeterminingSkinType({ fadeOutLoading }) {
    return (
      <div
        className={`quiz-page__determining ${
          fadeOutLoading ? "quiz-page__determining--fade-out" : ""
        }`}
      >
        <div className="quiz-page__spinner"></div>
        <p>Determining your skin type...</p>
      </div>
    );
  }
  
  export default DeterminingSkinType;