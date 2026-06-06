import { Link } from 'react-router-dom';
import SessionCard from '../../components/SessionCard/SessionCard.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { getSessionsForUser } from '../../services/storage.js';
import { HISTORY_TEXT } from '../../utils/constants.js';
import './History.less';

export default function History() {
  const { user } = useAuth();
  const sessions = getSessionsForUser(user.id);

  return (
    <div className="history-page">
      <header className="history-page__header">
        <h1 className="history-page__title">Session history</h1>
        <p className="history-page__subtitle">Review past analyses and continue coaching conversations.</p>
      </header>

      {sessions.length === 0 ? (
        <div className="history-page__empty-state">
          <div className="history-page__empty-icon">🏸</div>
          <h2 className="history-page__empty-title">No analyses recorded yet</h2>
          <p className="history-page__empty-text">Upload your stance coordinates on the primary dashboard to trigger insights.</p>
          <Link to="/dashboard" className="btn btn--primary history-page__empty-cta">Analyze now</Link>
        </div>
      ) : (
        <ul className="history-page__grid">
          {sessions.map((session) => (
            <li key={session.id} className="history-page__grid-item">
              <SessionCard session={session} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
