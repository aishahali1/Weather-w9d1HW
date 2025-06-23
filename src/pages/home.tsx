import { useNavigate } from 'react-router';

const WeatherHome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-200 to-blue-500 flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Welcome to WeatherNow ☀️</h1>
      <p className="text-white text-lg sm:text-xl mb-8 max-w-md">
        Get real-time weather updates around the world. Sign in or create an account to continue.
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => navigate('/signin')}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl shadow hover:bg-gray-100 transition"
        >
          Sign In
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-xl shadow hover:bg-yellow-500 transition"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default WeatherHome;
