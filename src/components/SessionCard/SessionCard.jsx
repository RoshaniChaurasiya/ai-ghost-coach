import { Link } from 'react-router-dom';
import { formatScore } from '../../utils/feedback';
import './SessionCard.less';

export default function SessionCard({ session }) {
  const dateLabel = new Date(session.date).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <article className="session-card">
      {/* 1. COMPONENT MEDIA COVER */}
      <div className="session-card__media">
        <img
          src={session.image}
          alt={`Technique session from ${dateLabel}`}
          className="session-card__image"
          loading="lazy"
        />
      </div>
      
      {/* 2. CARD DATA MODULES */}
      <div className="session-card__body">
        <time className="session-card__time" dateTime={session.date}>
          {dateLabel}
        </time>
        
        <div className="session-card__metric-row">
          <span className="session-card__label">Score</span>
          <span className="session-card__value">
            {formatScore(session.feedback?.overallScore)}
          </span>
        </div>
        
        <div className="session-card__fix-summary">
          <span className="session-card__label">Priority Fix</span>
          <p className="session-card__fix-text">
            {session.feedback?.priorityFix || 'No adjustments needed.'}
          </p>
        </div>
        
        {/* 3. PINNED BOTTOM INTERACTIVE TARGET ACTION */}
        <Link
          to={`/history/${session.id}`}
          className="session-card__cta"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}