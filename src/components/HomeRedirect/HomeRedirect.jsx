import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './HomeRedirect.less';

export default function HomeRedirect() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? '/dashboard' : '/login'} replace />;
}
