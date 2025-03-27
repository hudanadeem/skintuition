import "./ScanResults.scss";

function ScanResults({ results, resultsRef }) {
  const {
    skinType = "",
    summary = "",
    ingredientsList = "",
    analysis = {
      beneficial: [],
      potentialIrritants: [],
      harmful: [],
    },
  } = results || {};

  const wrapNumbers = (text) => {
    if (!text) return null;
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
      <div className="analysis__header">
        <h2 className="analysis__title">Product Analysis</h2>
        {skinType && (
          <div className="analysis__skin-type">
            <span className="analysis__skin-type--label">Skin Type:</span>
            <span className="analysis__skin-type--value">{skinType}</span>
          </div>
        )}
        {summary && (
          <div className="analysis__summary">
            <p>{wrapNumbers(summary)}</p>
          </div>
        )}
      </div>

      {ingredientsList && (
        <div className="analysis__ingredients">
          <h3>Full Ingredients List</h3>
          <div className="analysis__ingredients--content">
            {wrapNumbers(ingredientsList)}
          </div>
        </div>
      )}

      <div className="analysis__results-grid">
        {[
          {
            label: "🌟 Beneficial Ingredients",
            data: analysis.beneficial,
            type: "beneficial",
            color: "var(--success-green)",
          },
          {
            label: "⚠️ Potential Irritants",
            data: analysis.potentialIrritants,
            type: "irritants",
            color: "var(--warning-orange)",
          },
          {
            label: "🚫 Harmful Ingredients",
            data: analysis.harmful,
            type: "harmful",
            color: "var(--error-red)",
          },
        ].map((section, i) => (
          <div
            key={i}
            className={`analysis__results--section analysis__results--${section.type}`}
            style={{ borderTop: `4px solid ${section.color}` }}
          >
            <h3>{section.label}</h3>
            {section.data && section.data.length > 0 ? (
              <div className="analysis__results--bubbles">
                {section.data.map((ingredient, index) => (
                  <div
                    key={index}
                    className="analysis__bubble"
                    style={{ 
                      animationDelay: `${index * 200}ms`,
                      borderColor: section.color
                    }}
                  >
                    <div className="analysis__bubble--inner">
                      <div className="analysis__bubble--front">
                        {wrapNumbers(ingredient.name)}
                        {ingredient.rating && (
                          <span className="analysis__bubble--rating">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`star ${i < ingredient.rating ? "filled" : ""}`}
                              >
                                {i < ingredient.rating ? "★" : "☆"}
                              </span>
                            ))}
                          </span>
                        )}
                      </div>
                      <div className="analysis__bubble--back">
                        <p>{ingredient.reason}</p>
                        {ingredient.suggestions && (
                          <div className="analysis__bubble--suggestions">
                            <p>Suggestions:</p>
                            <ul>
                              {ingredient.suggestions.map((suggestion, i) => (
                                <li key={i}>{suggestion}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="analysis__no-items">No {section.label.toLowerCase()} detected.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ScanResults;