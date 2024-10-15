import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from './router/AppRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
