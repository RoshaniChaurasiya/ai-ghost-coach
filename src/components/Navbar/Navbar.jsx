import { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.less';
import { APP_NAME } from '../../utils/constants';

export default function Navbar() {
  const { logout, isAuthenticated } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on outside background interaction click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close responsive slide-drawer tray automatically on route navigation shift
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  if (!isAuthenticated) return null;

  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/* APPLICATION LOGO / BRAND MARK */}
        <NavLink to="/dashboard" className="navbar__brand" aria-label={`${APP_NAME} Home`}>
          <span className="navbar__brand-icon" aria-hidden="true">🏆</span>
          <span className="navbar__brand-text">{APP_NAME}</span>
        </NavLink>

        {/* RESPONSIVE HAMBURGER TOGGLE SYSTEM */}
        <button
          type="button"
          className="navbar__toggle"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle structural navigation menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* CONTROL AND LINKS MENU DRAWER HUB */}
        <div
          ref={menuRef}
          className={`navbar__menu ${isMenuOpen ? 'navbar__menu--open' : ''}`}
        >
          {/* CRITICAL LINKS ROUTING WRAPPER */}
          <nav className="navbar__nav" aria-label="Main system application navigation">
            <NavLink
              to="/dashboard"
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="/history"
              onClick={closeMenu}
              className={({ isActive }) =>
                `navbar__link ${isActive ? 'navbar__link--active' : ''}`
              }
            >
              History
            </NavLink>
          </nav>

          {/* SYSTEM USER CONTROLS PROFILE UTILITIES */}
          <div className="navbar__user">
            <button
              type="button"
              className="navbar__btn-logout"
              onClick={handleLogout}
            >
              Log out
            </button>
            
            <button
              type="button"
              className="navbar__theme-toggle"
              onClick={toggleTheme}
              aria-label={`Switch app visualization theme context to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <FaSun className="navbar__icon navbar__icon--sun" /> : <FaMoon className="navbar__icon navbar__icon--moon" />}
            </button>
          </div>

        </div>
      </div>

      {/* LOWER MOBILE BLUR BACKGROUND OVERLAY DISMISSAL SYSTEM */}
      {isMenuOpen && <div className="navbar__overlay" onClick={closeMenu} aria-hidden="true" />}
    </header>
  );
}