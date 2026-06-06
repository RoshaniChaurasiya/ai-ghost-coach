import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/AppLayout/AppLayout.jsx';
import HomeRedirect from '../components/HomeRedirect/HomeRedirect.jsx';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute.jsx';
import Dashboard from '../pages/Dashboard/Dashboard.jsx';
import History from '../pages/History/History.jsx';
import Login from '../pages/Login/Login.jsx';
import Register from '../pages/Register/Register.jsx';
import SessionDetails from '../pages/SessionDetails/SessionDetails.jsx';
import NotFound from '../pages/NotFound/NotFound.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeRedirect />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history"
        element={
          <ProtectedRoute>
            <AppLayout>
              <History />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/history/:sessionId"
        element={
          <ProtectedRoute>
            <AppLayout>
              <SessionDetails />
            </AppLayout>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
