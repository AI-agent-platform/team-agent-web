import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import './App.css';
import { AuthenticatedUserRedirect } from './utils/auth/routes.utils';
import { ContactPage } from '@mui/icons-material';
import AboutPage from './pages/AboutPage';
import Intro from './pages/IntroPage';
import HeroPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthenticatedUserRedirect><LoginPage /></AuthenticatedUserRedirect>} />
      <Route path="/signup" element={<AuthenticatedUserRedirect><SignUpPage /></AuthenticatedUserRedirect>} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/landing" element={<HeroPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/intro" element={<Intro />} />
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

export default App;
