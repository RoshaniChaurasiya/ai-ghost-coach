import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField/FormField.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../hooks/useTheme.js';
import { FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import './Login.less';
import { APP_NAME, APP_TAGLINE } from '../../utils/constants.js';
import { validateLogin } from '../../utils/validations.js';

export default function Login() {
  const { login, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    const nextErrors = validateLogin({ email, password });
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = login(email, password);
    setSubmitting(false);

    if (result.ok) {
      navigate(from, { replace: true });
    } else {
      setAuthError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-card" id="main-content">

        {/* BEM BLOCK HEADER SETUP */}
        <header className="auth-card__header">
          <h1 className="auth-card__title">{APP_NAME}</h1>
          <button
            type="button"
            className="auth-card__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        <p className="auth-card__subtitle">{APP_TAGLINE}</p>

        <form className="auth-card__form" onSubmit={handleSubmit} noValidate>
          <FormField id="login-email" label="Email" required error={errors.email}>
            {({ id, describedBy, ...aria }) => (
              <input
                id={id}
                type="email"
                autoComplete="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-describedby={describedBy}
                {...aria}
              />
            )}
          </FormField>

          <FormField id="login-password" label="Password" required error={errors.password}>
            {({ id, describedBy, ...aria }) => (
              <div className="form-field__password-wrapper">
                <input
                  id={id}
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  aria-describedby={describedBy}
                  {...aria}
                />
                <button
                  type="button"
                  className="form-field__toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            )}
          </FormField>

          {authError && (
            <p className="auth-card__banner" role="alert">
              <span className="auth-card__banner-icon">⚠️</span> {authError}
            </p>
          )}

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? 'Signing in…' : 'Log in'}
          </button>
        </form>

        <footer className="auth-card__footer">
          <span className="auth-card__footer-text">New user?</span>{' '}
          <Link to="/register" className="auth-card__footer-link">
            Create player profile
          </Link>
        </footer>
      </main>
    </div>
  );
}