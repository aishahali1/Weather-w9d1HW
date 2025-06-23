// components/Navbar.tsx
import { useNavigate } from 'react-router';

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token'); // or any token key
    navigate('/signin');
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-blue-600 text-white">
      <h1 className="text-xl font-bold">Weather App</h1>
      <button
        onClick={handleSignOut}
        className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
      >
        Sign Out
      </button>
    </nav>
  );
};

export default Navbar;
