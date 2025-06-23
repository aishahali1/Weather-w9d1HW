import { useState } from 'react';
import { useNavigate } from 'react-router';
import { saveToken } from '../utils/auth';
import { signIn } from '../services/auth.service';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await signIn(email, password );
      saveToken(data.data.token);
      navigate('/weather');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Sign in failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <form onSubmit={handleSubmit} className="p-8 bg-white shadow rounded space-y-4">
        <h2 className="text-2xl font-bold">Sign In</h2>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="input" required />
        <button type="submit" className="btn">Sign In</button>
      </form>
    </div>
  );
}
