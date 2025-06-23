import { useState } from 'react';
import { useNavigate } from 'react-router';
import { saveToken } from '../utils/auth';
import { signUp } from '../services/auth.service';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signUp(email, password);
      saveToken(data.token);
      navigate('/weather');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Sign up failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow rounded space-y-4">
        <h2 className="text-2xl font-bold">Sign Up</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input" required />
        <button type="submit" className="btn">Sign Up</button>
      </form>
    </div>
  );
}
