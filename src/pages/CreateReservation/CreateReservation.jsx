import { styled, Typography, Select, MenuItem } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LargeButton from '../../components/LargeButton';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PathName } from '../../router/AppRouter';

const StyledHeader = styled(Typography)({
  fontSize: '1.25rem',
  fontWeight: 700,
  lineHeight: '1.5rem'
});

const StyledLabel = styled(Typography)({
  fontSize: '0.78rem',
  fontWeight: 600,
  lineHeight: '1rem',
  color: '#323232'
});

export default function CreateReservation() {
  const {
    state: { user }
  } = useAuth();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    location: user.companies?.[0]?.locations?.[0].id,
    pickUpDay: null,
    dropOffDay: null,
    pickUpTime: '12:00',
    dropOffTime: '12:00'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleContinue = async () => {
    navigate(PathName.CUSTOM_RESERVATION_AVAILABLE_CARS, {
      state: {
        filter: {
          locationId: formData.location,
          from: new Date(`${formData.pickUpDay}T${formData.pickUpTime}`).getTime(),
          to: new Date(`${formData.dropOffDay}T${formData.dropOffTime}`).getTime()
        }
      }
    });
  };

  return (
    <Grid container sx={{ padding: '2.375rem 1.25rem' }}>
      <Grid size={{ xs: 12 }} sx={{ marginBottom: '1.25rem' }}>
        <StyledHeader>Create new reservation</StyledHeader>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ padding: '1.5rem 1.25rem', backgroundColor: '#E8EDED', borderRadius: '0.75rem' }}>
        <Grid container columnSpacing={1}>
          <Grid size={{ xs: 12 }}>
            <StyledLabel>Pick up Location</StyledLabel>
          </Grid>
          <Grid size={{ xs: 12 }} sx={{ margin: '0.5rem 0 1.25rem 0' }}>
            <StyledSelect
              name="location"
              value={formData.location}
              options={user.companies?.[0]?.locations ?? []}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledLabel>Pick up Day</StyledLabel>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ margin: '0.5rem 0 1.25rem 0' }}>
            <StyledInput name="pickUpDay" value={formData.pickUpDay} type="date" onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ margin: '0.5rem 0 1.25rem 0' }}>
            <StyledInput type="time" name="pickUpTime" value={formData.pickUpTime} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <StyledLabel>Drop off Day</StyledLabel>
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ margin: '0.5rem 0 1.25rem 0' }}>
            <StyledInput name="dropOffDay" value={formData.dropOffDay} type="date" onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 6 }} sx={{ margin: '0.5rem 0 1.25rem 0' }}>
            <StyledInput type="time" name="dropOffTime" value={formData.dropOffTime} onChange={handleChange} />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <LargeButton disabled={Object.values(formData).filter((d) => !d).length} fullWidth onClick={handleContinue}>
              Continue
            </LargeButton>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const StyledInput = (props) => {
  const Sinput = styled('input')({
    'width': '100%',
    'padding': props.type === 'time' ? '0.425rem' : '0.5rem',
    'borderRadius': '0.5rem',
    'outline': 'none',
    'border': 'none',
    '&:focus': {
      outline: 'none'
    }
  });

  const handleFocus = (e) => {
    if (props.type === 'date') {
      e.target.showPicker?.();
    }
  };

  return <Sinput {...props} onFocus={handleFocus} />;
};

const StyledSelect = ({ options, onChange, name, value }) => {
  return (
    <Select
      fullWidth
      value={value}
      onChange={onChange}
      displayEmpty
      name={name}
      sx={{
        'backgroundColor': 'white',
        '& .MuiSelect-icon': { color: '#000' },
        '& .MuiSelect-select': { padding: '8px' }
      }}
    >
      {options.map((option) => (
        <MenuItem value={option.id} key={option.id}>
          {option.name}, {option.city}
        </MenuItem>
      ))}
    </Select>
  );
};
