import "./ScanResults.scss";

function ScanResults({ results, resultsRef }) {
  return (
    <div className="analysis-page__results" ref={resultsRef}>
      <h2 className="analysis-page__results-title">Scan Results</h2>

      {[
        { label: "Beneficial Ingredients", data: results.beneficial },
        { label: "Potential Irritants", data: results.potentialIrritants },
        { label: "Harmful Ingredients", data: results.harmful },
      ].map((section, i) => (
        <div key={i} className="analysis-page__results-section">
          <h3>{section.label}</h3>
          {section.data && section.data.length > 0 ? (
            <div className="analysis-page__results-bubbles">
              {section.data.map((ingredient, index) => (
                <div
                  key={index}
                  className="analysis-page__bubble"
                  style={{ animationDelay: `${index * 800}ms` }}
                >
                  <div className="analysis-page__bubble-inner">
                    <div className="analysis-page__bubble-front">
                      {ingredient.name}
                    </div>
                    <div className="analysis-page__bubble-back">
                      {ingredient.description}
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
