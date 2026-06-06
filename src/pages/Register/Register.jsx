import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import FormField from '../../components/FormField/FormField.jsx';
import { useAuth } from '../../hooks/useAuth.js';
import { useTheme } from '../../hooks/useTheme.js';
import {
  EXPERIENCE_LEVELS,
  SPORT_ROLES,
  SPORTS,
} from '../../utils/constants.js';
import { FaEye, FaEyeSlash, FaSun, FaMoon } from 'react-icons/fa';
import './Register.less';
import { APP_DESCRIPTION } from '../../utils/constants.js';
import { validateRegister } from '../../utils/validations.js';

const initialSport = SPORTS[0];
const initial = {
  name: '',
  email: '',
  age: '',
  sport: initialSport,
  role: SPORT_ROLES[initialSport][0],
  level: 'Beginner',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const { register, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const update = (field) => (e) => {
    const value = e.target.value;
    setForm((prev) => {
      if (field === 'sport') {
        const nextRoleOptions = SPORT_ROLES[value] || [];
        return {
          ...prev,
          sport: value,
          role: nextRoleOptions[0] ?? '',
        };
      }

      return {
        ...prev,
        [field]: value,
      };
    });

    setErrors((prev) => {
      const next = { ...prev, [field]: '' };
      if (field === 'sport') next.role = '';
      return next;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextErrors = validateRegister(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = register(form);
    setSubmitting(false);

    if (result.ok) {
      navigate('/dashboard');
    } else {
      setErrors({ email: result.error });
    }
  };

  return (
    <div className="auth-page">
      <main className="auth-card auth-card--wide" id="main-content">

        {/* HEADER ELEMENT */}
        <header className="auth-card__header">
          <h1 className="auth-card__title">Create player profile</h1>
          <button
            type="button"
            className="auth-card__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </header>

        <p className="auth-card__subtitle">{APP_DESCRIPTION}</p>

        <form className="auth-card__form" onSubmit={handleSubmit} noValidate>

          {/* SECTION ROW 1: PERSONAL INITIALS */}
          <div className="form-fields-row">
            <FormField id="reg-name" label="Full name" required error={errors.name}>
              {({ id, describedBy, ...aria }) => (
                <input
                  id={id}
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={update('name')}
                  required
                  disabled={submitting}
                  aria-describedby={describedBy}
                  {...aria}
                />
              )}
            </FormField>

            <FormField id="reg-email" label="Email" required error={errors.email}>
              {({ id, describedBy, ...aria }) => (
                <input
                  id={id}
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={update('email')}
                  required
                  disabled={submitting}
                  aria-describedby={describedBy}
                  {...aria}
                />
              )}
            </FormField>
          </div>

          {/* SECTION ROW 2: ATHLETIC PROFILE OPTIONS */}
          <div className="form-fields-row form-fields-row--triple">
            <FormField id="reg-age" label="Age" required error={errors.age}>
              {({ id, describedBy, ...aria }) => (
                <input
                  id={id}
                  type="number"
                  min={5}
                  max={100}
                  placeholder="24"
                  value={form.age}
                  onChange={update('age')}
                  required
                  disabled={submitting}
                  aria-describedby={describedBy}
                  {...aria}
                />
              )}
            </FormField>

            <FormField id="reg-sport" label="Sport" required error={errors.sport}>
              {({ id, describedBy, ...aria }) => (
                <select id={id} value={form.sport} onChange={update('sport')} disabled={submitting} aria-describedby={describedBy} {...aria}>
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>
                      {sport}
                    </option>
                  ))}
                </select>
              )}
            </FormField>

            <FormField id="reg-role" label="Role / Position" required error={errors.role}>
              {({ id, describedBy, ...aria }) => {
                const roleOptions = SPORT_ROLES[form.sport] || [];
                return (
                  <select id={id} value={form.role} onChange={update('role')} disabled={submitting} aria-describedby={describedBy} {...aria}>
                    {roleOptions.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                );
              }}
            </FormField>
          </div>

          {/* SECTION ROW 3: COMPETENCY */}
          <FormField id="reg-level" label="Experience level" required error={errors.level}>
            {({ id, describedBy, ...aria }) => (
              <select id={id} value={form.level} onChange={update('level')} disabled={submitting} aria-describedby={describedBy} {...aria}>
                {EXPERIENCE_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            )}
          </FormField>

          {/* SECTION ROW 4: PROTECTION CREDS */}
          <div className="form-fields-row">
            <FormField id="reg-password" label="Password" required error={errors.password}>
              {({ id, describedBy, ...aria }) => (
                <div className="form-field__password-wrapper">
                  <input
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.password}
                    onChange={update('password')}
                    required
                    disabled={submitting}
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

            <FormField
              id="reg-confirm"
              label="Confirm password"
              required
              error={errors.confirmPassword}
            >
              {({ id, describedBy, ...aria }) => (
                <div className="form-field__password-wrapper">
                  <input
                    id={id}
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    placeholder="••••••••"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    required
                    disabled={submitting}
                    aria-describedby={describedBy}
                    {...aria}
                  />
                  <button
                    type="button"
                    className="form-field__toggle"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              )}
            </FormField>
          </div>

          <button type="submit" className="btn btn--primary btn--block" disabled={submitting}>
            {submitting ? 'Creating profile…' : 'Register Profile'}
          </button>
        </form>

        <footer className="auth-card__footer">
          <span className="auth-card__footer-text">Already registered?</span>{' '}
          <Link to="/login" className="auth-card__footer-link">Log in</Link>
        </footer>
      </main>
    </div>
  );
}