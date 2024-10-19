import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UserSignup from '../pages/Register/UserSignup';
import ConfirmRegister from '../pages/ConfirmRegister/ConfirmRegister';
import NavBar from '../components/NavBar';
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';

export const PathName = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  CONFIRM_REGISTER: '/signup/confirm',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/'
};

export const unAuthOnlyPaths = [PathName.SIGNUP, PathName.CONFIRM_REGISTER, PathName.LOGIN, PathName.FORGOT_PASSWORD];

const routes = [
  { path: PathName.SIGNUP, element: <UserSignup />, key: 'signup', isProtected: false, roles: null },
  {
    path: PathName.CONFIRM_REGISTER,
    element: <ConfirmRegister />,
    key: 'signup/confirm',
    isProtected: false,
    roles: null
  },
  { path: PathName.LOGIN, element: <Login />, key: 'login', isProtected: false, roles: null },
  {
    path: PathName.FORGOT_PASSWORD,
    element: <ForgotPassword />,
    key: 'forgot-password',
    isProtected: false,
    roles: null
  }
];

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, key, roles, isProtected }) => {
          const protectedElement = (
            <ProtectedRoute roles={roles} isProtected={isProtected} path={path}>
              {element}
            </ProtectedRoute>
          );
          const finalElement = unAuthOnlyPaths.includes(path) ? (
            <>
              <NavBar />
              {protectedElement}
            </>
          ) : (
            protectedElement
          );
          return (
            <Route key={key} element={finalElement}>
              <Route path={path} element={element} />
            </Route>
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
