import { formatScore } from '../../utils/feedback';
import { FEEDBACK_TEXT } from '../../utils/constants';
import './FeedbackCard.less';

function Section({ title, items, variant, icon }) {
  if (!items?.length) return null;

  return (
    <section className={`feedback-card__section feedback-card__section--${variant}`}>
      <h3 className="feedback-card__section-title">
        <span className="feedback-card__section-icon">{icon}</span>
        {title}
      </h3>

      <ul className="feedback-card__list">
        {items.map((item, idx) => (
          <li key={idx} className={`feedback-card__item feedback-card__item--${variant}`}>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function FeedbackCard({ feedback }) {
  if (!feedback) return null;

  // Safe formatting parsing using your workspace tools
  const score = formatScore(feedback.overallScore);
  // Parse raw numeric value for fluid progress meter logic width rendering (fallback to 0)
  const numericScore = parseFloat(feedback.overallScore) || 0;

  // Determine low/med/high variant modifiers dynamically for the header container
  const getConfidenceModifier = (level) => {
    if (!level) return 'medium';
    const lower = level.toLowerCase();
    if (lower.includes('high')) return 'high';
    if (lower.includes('low')) return 'low';
    return 'medium';
  };

  const confidenceMod = getConfidenceModifier(feedback.confidenceLevel);

  return (
    <article className="feedback-card">
      {/* Top Title Workspace Action Header */}
      <header className="feedback-card__header">
        <h2 className="feedback-card__title">
          {FEEDBACK_TEXT.title}
        </h2>
        
        {feedback.confidenceLevel && (
          <div className={`feedback-card__confidence feedback-card__confidence--${confidenceMod}`}>
            <span className="feedback-card__confidence-dot"></span>
            {FEEDBACK_TEXT.confidenceLabel || 'Confidence:'}{' '}
            <strong>{feedback.confidenceLevel}</strong>
          </div>
        )}
      </header>

      {/* 1. STUNNING OVERALL SCORE OVERVIEW PANEL */}
      <section className="feedback-card__section feedback-card__section--score-dashboard">
        <div className="feedback-card__score-layout">
          <div className="feedback-card__score-block">
            <span className="feedback-card__score-value">{score}</span>
          </div>
          
          <div className="feedback-card__meter-block">
            <span className="feedback-card__score-heading">
              {FEEDBACK_TEXT.scoreLabel || 'Technique Rating'}
            </span>
            <div className="feedback-card__meter-track">
              <div 
                className="feedback-card__meter-thumb"
                style={{ width: `${Math.min(Math.max(numericScore * 10, 0), 100)}%` }}
                role="progressbar"
                aria-valuenow={numericScore}
                aria-valuemin="0"
                aria-valuemax="10"
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STRENGTHS BLOCK MODULE */}
      <Section
        title={FEEDBACK_TEXT.strengths}
        items={feedback.strengths}
        variant="success"
        icon="✓"
      />

      {/* 3. AREAS TO IMPROVE BLOCK MODULE */}
      <Section
        title={FEEDBACK_TEXT.improvements}
        items={feedback.areasToImprove}
        variant="warning"
        icon="⚠️"
      />

      {/* 4. PRIORITY FIX CALLOUT CARD */}
      {feedback.priorityFix && (
        <section className="feedback-card__section feedback-card__section--priority">
          <span className="feedback-card__badge">Session Focus</span>
          <h3 className="feedback-card__section-title">
            <span className="feedback-card__section-icon">🎯</span>
            {FEEDBACK_TEXT.priorityFix}
          </h3>
          <p className="feedback-card__priority-text">{feedback.priorityFix}</p>
        </section>
      )}

      {/* 5. TRAINING DRILL SUGGESTION DRAWER */}
      {feedback.drillSuggestion && (
        <section className="feedback-card__section feedback-card__section--drill">
          <h3 className="feedback-card__section-title">
            <span className="feedback-card__section-icon">🏃‍♂️</span>
            {FEEDBACK_TEXT.drill}
          </h3>
          <div className="feedback-card__drill-wrapper">
            <p className="feedback-card__drill-text">{feedback.drillSuggestion}</p>
          </div>
        </section>
      )}
    </article>
  );
}