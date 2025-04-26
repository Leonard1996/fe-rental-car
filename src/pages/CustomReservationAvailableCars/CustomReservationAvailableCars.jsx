import React, { useEffect } from 'react';
import { OwnerSerivce } from '../../services/owner.service';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';

const CustomReservationAvailableCars = () => {
  const {
    state: { user }
  } = useAuth();

  const location = useLocation();
  const { filter } = location.state || {};

  const fetchAvailableCars = async () => {
    const [_res, err] = await OwnerSerivce.getAvailableCarsForCustomReservation(user.companies[0].id, filter);
    if (!err) return;
    alert(err.message);
  };

  useEffect(() => {
    if (filter) {
      fetchAvailableCars(filter);
    }
  }, [filter]);

  return (
    <div>
      <h1>Available Cars</h1>
      <p>List of cars available for reservation will be displayed here.</p>
    </div>
  );
};

export default CustomReservationAvailableCars;
