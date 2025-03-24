import "./ScanResults.scss";

function ScanResults({ results, resultsRef }) {
  const {
    skin_type = "your",
    summary = "",
    ingredientsList = "",
    analysis = {
      beneficial: [],
      potentialIrritants: [],
      harmful: [],
    },
  } = results || {};

  const wrapNumbers = (text) => {
    if (typeof text !== "string") return text;
    return text.split(/(\d+)/).map((part, i) =>
      /^\d+$/.test(part) ? (
        <span key={i} className="number-fallback">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="analysis" ref={resultsRef}>
      <div className="analysis__meta">
        <p className="analysis__skin-type">
          {wrapNumbers(`Results for your ${skin_type} skin`)}
        </p>
        {summary && <p className="analysis__summary">{wrapNumbers(summary)}</p>}
      </div>

      {[
        {
          label: "Beneficial Ingredients",
          data: analysis.beneficial,
          type: "beneficial",
        },
        {
          label: "Potential Irritants",
          data: analysis.potentialIrritants,
          type: "irritants",
        },
        {
          label: "Harmful Ingredients",
          data: analysis.harmful,
          type: "harmful",
        },
      ].map((section, i) => (
        <div
          key={i}
          className={`analysis__results--section analysis__results--${section.type}`}
        >
          <h3>{section.label}</h3>
          {section.data && section.data.length > 0 ? (
            <div className="analysis__results--bubbles">
              {section.data.map((ingredient, index) => (
                <div
                  key={index}
                  className="analysis__bubble"
                  style={{ animationDelay: `${index * 800}ms` }}
                >
                  <div className="analysis__bubble--inner">
                    <div className="analysis__bubble--front">
                      {wrapNumbers(ingredient.name)}
                    </div>
                    <div className="analysis__bubble--back">
                      {ingredient.reason}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No {section.label.toLowerCase()} detected.</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default ScanResults;
