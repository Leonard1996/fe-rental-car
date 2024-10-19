import { Navigate, Outlet } from 'react-router-dom';
import { unAuthOnlyPaths } from '../router/AppRouter';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ roles, isProtected, path }) => {
  const {
    state: { user }
  } = useAuth();

  if (unAuthOnlyPaths.includes(path) && user) {
    return <Navigate to="/" />;
  }

  if (isProtected && !user) {
    return <Navigate to="/login" />;
  }

  if (roles && user && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
