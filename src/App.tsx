import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import SignUp from './pages/signup';
import SignIn from './pages/signin';
import Weather from './pages/weather';
import { isAuthenticated } from './utils/auth';
import WeatherHome from './pages/home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherHome/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/weather" element={isAuthenticated() ? <Weather /> : <Navigate to="/signin" />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </Router>
  );
}
