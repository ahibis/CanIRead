import { Container, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { green, purple } from '@mui/material/colors';
import logo from './logo.svg'
import './App.css'
import Page from './components/Page'
const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Page></Page>
      </Container>
    </ThemeProvider>
    
  )
}

export default App
