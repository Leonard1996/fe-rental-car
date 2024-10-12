import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import Login from '../pages/Login/Login';

export const PathName = {
  LOGIN: '/login',
  SIGNUP: '/signup'
};

export const unAuthOnlyPaths = [PathName.LOGIN];

const routes = [{ path: PathName.LOGIN, element: <Login />, key: 'login', isProtected: false, roles: null }];

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, key, roles, isProtected }) => (
          <Route key={key} element={<ProtectedRoute roles={roles} isProtected={isProtected} path={path} />}>
            <Route path={path} element={element} />
          </Route>
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
