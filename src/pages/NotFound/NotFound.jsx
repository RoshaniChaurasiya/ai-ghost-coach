import { Link } from 'react-router-dom';
import './NotFound.less';

export default function NotFound() {
  return (
    <div className="notfound-page">
      {/* Visual background ambient glow element */}
      <div className="notfound-page__glow-backdrop" aria-hidden="true" />
      
      <div className="notfound-page__content">
        <div className="notfound-page__icon" aria-hidden="true">🧭</div>
        
        <h1 className="notfound-page__title">404</h1>
        <h2 className="notfound-page__subtitle">Page Not Found</h2>

        <p className="notfound-page__text">
          Oops! The coaching arena or session report you are looking for doesn’t exist or has been moved.
        </p>

        <Link to="/" className="btn btn--primary notfound-page__btn">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}