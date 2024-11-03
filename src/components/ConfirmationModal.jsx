import { Box, Modal, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import LargeButton from './LargeButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '25rem',
  bgcolor: 'background.paper',
  border: '2px solid #eee',
  boxShadow: '1.5rem',
  p: '0.25rem',
  padding: '1.5rem'
};

export default function ConfirmationModal({
  text,
  handleCancel,
  handleConfirm,
  isOpen,
  children,
  cancelText = 'Cancel',
  confirmText = 'Confirm'
}) {
  return (
    <Modal
      open={isOpen}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: '2rem' }}>
          {text}
        </Typography>
        {children}
        <Grid container>
          <Grid size={{ xs: 6 }}></Grid>
          <Grid size={{ xs: 3 }}>
            <LargeButton sx={{ backgroundColor: '#ABABAB', border: 'none' }} onClick={handleCancel}>
              {cancelText}
            </LargeButton>
          </Grid>
          <Grid size={{ xs: 3 }}>
            <LargeButton onClick={handleConfirm}>{confirmText}</LargeButton>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}
