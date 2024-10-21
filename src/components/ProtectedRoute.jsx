import { Navigate, Outlet } from 'react-router-dom';
import { unAuthOnlyPaths } from '../router/AppRouter';
import { useAuth } from '../context/AuthContext';
import NavBar from './NavBar';

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

  return (
    <>
      {!unAuthOnlyPaths.includes(path) && <NavBar />}
      <Outlet />
    </>
  );
};

export default ProtectedRoute;
