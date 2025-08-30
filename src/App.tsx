import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import OwnerAgentPage from './pages/OwnerAgentPage';
import CustomerAgentPage from './pages/CustomerAgentPage';
import './App.css';
import { AuthenticatedUserRedirect } from './utils/auth/routes.utils';
import AboutPage from './pages/AboutPage';
import Intro from './pages/IntroPage';
import HeroPage from './pages/LandingPage';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<AuthenticatedUserRedirect><LoginPage /></AuthenticatedUserRedirect>} />
      <Route path="/signup" element={<AuthenticatedUserRedirect><SignUpPage /></AuthenticatedUserRedirect>} />
      <Route path="/home" element={<Navigate to="/landing#what-we-offer" replace />} />
      <Route path="/owner-agent" element={<OwnerAgentPage />} />
      <Route path="/customer-agent" element={<CustomerAgentPage />} />
      <Route path="/landing" element={<HeroPage />} />
      <Route path="/contact" element={<Navigate to="/landing#contact" replace />} />
      <Route path="/about" element={<Navigate to="/landing#about" replace />} />
      <Route path="/intro" element={<Navigate to="/landing#intro" replace />} />
      <Route path="*" element={<Navigate to="/landing" replace />} />
    </Routes>
  );
}

export default App;
