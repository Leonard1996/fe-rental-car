import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid2';
import { getDifferenceInDays, getReadableLocalTime } from '../common/helpers';
import carImagePlaceholder from '../assets/images/car-placeholder.jpg';
import { Box, styled, TextareaAutosize, Typography } from '@mui/material';
import { colors } from '../themes/base-theme';
import LargeButton from './LargeButton';
import { reservationStatus } from '../common/constants';
import ConfirmationModal from './ConfirmationModal';
import { useState } from 'react';
import { OwnerSerivce } from '../services/owner.service';
import { useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const StyledTitle = styled(Typography)({
  fontSize: '.875rem',
  fontWeight: 500,
  lineHeight: '0.8rem',
  textAlign: 'left',
  color: '#313131',
  textTransform: 'capitalize'
});

export const StyledSubTitle = styled(Typography)({
  fontSize: '.75rem',
  fontWeight: 400,
  lineHeight: '0.8rem',
  textAlign: 'left',
  color: '#959595',
  textTransform: 'capitalize'
});

const StyledTag = styled(Box)({
  display: 'inline-block',
  backgroundColor: colors.lightGreen,
  color: colors.mainDarkGreen,
  borderRadius: '.375rem',
  padding: '.375rem .75rem',
  fontSize: '.875rem',
  textTransform: 'capitalize'
});

export default function CarReservationCard({
  isShuttle,
  make,
  model,
  type,
  from,
  to,
  price,
  notes,
  status,
  location,
  year,
  engine,
  licensePlate,
  requestedCarId,
  reservationId
}) {
  const days = getDifferenceInDays(from, to);
  const [isOpen, setIsOpen] = useState(false);
  const {
    state: { user }
  } = useAuth();

  const navigate = useNavigate();
  const notesRef = useRef();

  const handleReject = () => {
    setIsOpen(true);
  };

  const handleConfirm = async () => {
    const [_res, err] = await OwnerSerivce.updateReservation(
      {
        status: reservationStatus.REJECTED,
        ownerNotes: notesRef.current.value ?? '',
        selectedCarId: requestedCarId
      },
      user.companies[0].id,
      reservationId
    );
    if (!err) return;
    alert(err.message);
  };

  const handleAcceptRequest = () => {
    navigate(`reservations/${reservationId}/car-options/`);
  };

  return (
    <>
      <Card sx={{ minWidth: 355, maxWidth: '100%', borderRadius: '12px', border: '2px solid #F9F9F9' }} elevation={0}>
        <CardContent>
          <Grid container>
            <Grid size={{ xs: 9 }}>
              <Grid container>
                <Grid size={{ xs: 12 }} sx={{ marginBottom: '.625rem' }}>
                  <StyledTitle>{isShuttle ? 'Tirana International Airport' : location}</StyledTitle>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <StyledSubTitle>{make + ' ' + model + ' ' + year + ' ' + engine}</StyledSubTitle>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 3 }} sx={{ textAlign: 'right' }}>
              <StyledTag>{days} Days</StyledTag>
            </Grid>
            <Grid size={{ xs: 12 }}>
              <img src={carImagePlaceholder} style={{ width: '100%' }} loading="lazy" alt={make + ' ' + model} />
            </Grid>
            <Grid size={{ xs: 7 }} sx={{ marginBottom: '1rem' }}>
              <Grid container>
                <Grid size={{ xs: 12 }} sx={{ marginBottom: '.625rem' }}>
                  <StyledTitle>{type}</StyledTitle>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <StyledSubTitle>{licensePlate}</StyledSubTitle>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 5 }} sx={{ marginBottom: '1rem' }}>
              <Grid container>
                <Grid size={{ xs: 12 }} sx={{ marginBottom: '.625rem' }}>
                  <StyledTitle sx={{ fontWeight: 600, textAlign: 'right' }}>€{days * price} total</StyledTitle>
                </Grid>
                <Grid size={{ xs: 12 }} sx={{ textAlign: 'right' }}>
                  <StyledSubTitle sx={{ fontWeight: 600, color: '#9D9D9D', textAlign: 'right' }}>
                    €{price}/day
                  </StyledSubTitle>
                </Grid>
              </Grid>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1rem' }}>
              <StyledTitle sx={{ fontWeight: 700 }}>Reservation Time</StyledTitle>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '.625rem' }}>
              <StyledTitle>
                {getReadableLocalTime(from)} - {getReadableLocalTime(to)}
              </StyledTitle>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1rem', overflow: 'auto', height: '1.65rem' }}>
              <StyledSubTitle>{notes}</StyledSubTitle>
            </Grid>
            <Grid size={{ xs: 12 }} sx={{ marginBottom: '1rem' }}>
              <StyledTag sx={{ color: colors.darkGrey, backgroundColor: colors.almostWhiteGrey }}>{status}</StyledTag>
            </Grid>
            {status === reservationStatus.PENDING && (
              <Grid size={{ xs: 12 }}>
                <Grid container>
                  <Grid size={{ xs: 5 }} sx={{ textAlign: 'right' }}>
                    <LargeButton fullWidth sx={{ backgroundColor: '#ABABAB', border: 'none' }} onClick={handleReject}>
                      Reject
                    </LargeButton>
                  </Grid>
                  <Grid size={{ xs: 2 }}></Grid>
                  <Grid size={{ xs: 5 }} sx={{ textAlign: 'left' }}>
                    <LargeButton onClick={handleAcceptRequest} fullWidth>
                      Accept Request
                    </LargeButton>
                  </Grid>
                </Grid>
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
      <ConfirmationModal
        confirmText="Reject"
        text="Are you sure you want to reject this reservation?"
        isOpen={isOpen}
        handleCancel={() => setIsOpen(false)}
        handleConfirm={handleConfirm}
      >
        <TextareaAutosize
          style={{ width: '100%', marginBottom: '2rem', background: '#F3F3F3', border: 'none' }}
          minRows={5}
          placeholder="Write a rejection reason for the user to read"
          ref={notesRef}
        />
      </ConfirmationModal>
    </>
  );
}
