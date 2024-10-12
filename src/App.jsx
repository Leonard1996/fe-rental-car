import { createTheme, ThemeProvider } from '@mui/material/styles';
import AppRouter from './router/AppRouter';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const theme = createTheme({
  typography: {
    fontFamily: 'Inter'
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
