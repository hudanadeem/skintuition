import "./DeterminingSkinType.scss";
function DeterminingSkinType({ fadeOutLoading }) {
  return (
    <div
      className={`quiz__determining ${
        fadeOutLoading ? "quiz__determining--fade" : ""
      }`}
    >
      <div className="quiz__spinner"></div>
      <p>Determining your skin type...</p>
    </div>
  );
}

export default DeterminingSkinType;
