import { useState,useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar';

const API_BASE_URL = 'https://weatherapi-skmb.onrender.com/'; // Replace with your backend
const token = localStorage.getItem('token');

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: { description: string }[];
  name: string;
}

interface HistoryEntry {
  lat: number;
  lon: number;
  requestedAt: string;
}

const WeatherPage = () => {
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const response = await axios.get(`${API_BASE_URL}api/weather?lat=${lat}&lon=${lon}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setWeather(response.data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch weather.');
    } finally {
      setLoading(false);
    }
  };

   const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/history`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setHistory(res.data.data);
    } catch (err) {
      console.error('Failed to fetch history');
    }
  };

   useEffect(() => {
    if (weather) fetchHistory();
  }, [weather]);


  return (<>
    <Navbar></Navbar>
    <div className="min-h-screen bg-blue-50 flex flex-col items-center justify-start pt-10 px-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Weather Checker</h1>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Latitude"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <input
            type="text"
            placeholder="Longitude"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
          <button
            onClick={fetchWeather}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Get Weather
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>

        {weather && (
          <div className="mt-6 bg-blue-100 p-4 rounded">
            <h2 className="text-lg font-semibold mb-2">🌦️ Weather in {weather.name}</h2>
            <p>🌡️ Temperature: {weather.main.temp}°C</p>
            <p>💧 Humidity: {weather.main.humidity}%</p>
            <p>🌤️ Description: {weather.weather[0].description}</p>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2 text-blue-800">📜 Request History</h2>
            <ul className="bg-gray-100 rounded p-3 space-y-2 max-h-48 overflow-y-auto">
              {history.map((entry, idx) => (
                <li key={idx} className="text-sm text-gray-700">
                  📍 Lat: {entry.lat}, Lon: {entry.lon}, 🕒{" "}
                  {new Date(entry.requestedAt).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default WeatherPage;
