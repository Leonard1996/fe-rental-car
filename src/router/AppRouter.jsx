import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import NotFoundPage from '../pages/NotFoundPage/NotFoundPage';
import UserSignup from '../pages/Register/UserSignup';
import ConfirmRegister from '../pages/ConfirmRegister/ConfirmRegister';
import Login from '../pages/Login/Login';
import ForgotPassword from '../pages/ForgotPassword/ForgotPassword';
import Home from '../pages/Home/Home';
import OwnerPanel from '../pages/Home/OwnerPanel';
import React from 'react';
import CarOptions from '../pages/CarOptions/CarOptions';
import ReservationReview from '../pages/ReservationReview/ReservationReview';
import ReservationAccepted from '../pages/ReservationReview/ReservationAccepted';
import ReservationView from '../pages/ReservationReview/ReservationView';
import MyCars from '../pages/MyCars.jsx/MyCars';
import CreateReservation from '../pages/CreateReservation/CreateReservation';
import CustomReservationAvailableCars from '../pages/CustomReservationAvailableCars/CustomReservationAvailableCars';

export const UserRoles = {
  Owner: 'owner',
  Client: 'client',
  Admin: 'admin'
};

export const PathName = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  CONFIRM_REGISTER: '/signup/confirm',
  FORGOT_PASSWORD: '/forgot-password',
  HOME: '/',
  OWNER_PANEL: '/owner-panel',
  OWNER_PANEL_CAR_OPTIONS: '/owner-panel/reservations/:reservationId/car-options',
  OWNER_PANEL_RESERVATION_REVIEW: '/owner-panel/reservations/:reservationId/review',
  OWNER_PANEL_RESERVATION_ACCEPTED: '/owner-panel/reservations/accepted',
  OWNER_PANEL_RESERVATION_VIEW: '/owner-panel/reservations/:reservationId/view',
  CARS: '/cars',
  OWNER_CREATE_RESERVATION: '/owner-panel/create-reservation',
  CUSTOM_RESERVATION_AVAILABLE_CARS: '/owner-panel/custom-reservation/cars'
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
  },
  {
    path: PathName.HOME,
    element: <Home />,
    key: 'home',
    isProtected: false,
    roles: null
  },
  {
    path: PathName.OWNER_PANEL,
    element: <OwnerPanel />,
    key: 'owner-panel',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.OWNER_PANEL_CAR_OPTIONS,
    element: <CarOptions />,
    key: 'owner-panel-car-options',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.OWNER_PANEL_RESERVATION_REVIEW,
    element: <ReservationReview />,
    key: 'owner-panel-reservation-review',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.OWNER_PANEL_RESERVATION_ACCEPTED,
    element: <ReservationAccepted />,
    key: 'owner-panel-reservation-accepted',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.OWNER_PANEL_RESERVATION_VIEW,
    element: <ReservationView />,
    key: 'owner-panel-reservation-view',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.CARS,
    element: <MyCars />,
    key: 'cars',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.OWNER_CREATE_RESERVATION,
    element: <CreateReservation />,
    key: 'create-reservation',
    isProtected: true,
    roles: UserRoles.Owner
  },
  {
    path: PathName.CUSTOM_RESERVATION_AVAILABLE_CARS,
    element: <CustomReservationAvailableCars />,
    key: 'custom-reservation-available-cars',
    isProtected: true,
    roles: UserRoles.Owner
  }
];

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element, key, roles, isProtected }) => {
          const protectedElement = (
            <>
              <ProtectedRoute roles={roles} isProtected={isProtected} path={path}>
                {element}
              </ProtectedRoute>
            </>
          );

          return (
            <React.Fragment key={key}>
              <Route key={key} element={protectedElement}>
                <Route path={path} element={element} />
              </Route>
            </React.Fragment>
          );
        })}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
