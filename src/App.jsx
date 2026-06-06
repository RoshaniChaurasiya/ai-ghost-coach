import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar.jsx';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './App.less'; // <-- Linked directly right here!

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <div className="app-layout-root">
            {/* Accessibility Skip-Link Route */}
            <a href="#main-content" className="app-layout-root__skip-link">
              Skip to main content
            </a>
            
            {/* Nav Header */}
            <Navbar />
            
            {/* Dynamic Page Views */}
            <div className="app-layout-root__viewport">
              <AppRoutes />
            </div>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}