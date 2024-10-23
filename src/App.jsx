import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from './router/AppRouter';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider } from './context/AuthContext';
import { LoadingProvider } from './context/LoadingContext';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoadingProvider>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}

export default App;
