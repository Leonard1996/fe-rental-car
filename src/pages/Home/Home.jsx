import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useEffect } from 'react';
import { reservationStatus } from '../../common/constants';
import { UserRoles } from '../../router/AppRouter';

export default function Home() {
  const {
    state: { user }
  } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === UserRoles.Client || !user) {
      return <div>client path</div>;
    }

    if (user?.role === UserRoles.Owner) {
      return navigate(`/owner-panel?status=${reservationStatus.APPROVED}`);
    }

    if (user.role === UserRoles.Admin) {
      return <div>admin path</div>;
    }

    throw new Error('User role is invalid or missing');
  }, []);
}
