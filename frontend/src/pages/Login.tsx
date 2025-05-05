// src/pages/Login.tsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    email: string;
    role: string;
  };
}

const Login: React.FC = () => {
  const { setAuthenticated, setUserRole } = useAuth(); // Include setUserRole
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [feedback, setFeedback] = useState<{ type: 'error' | 'success'; text: string } | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      const res = await fetch('http://localhost:3000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        setFeedback({ type: 'error', text: data.message || 'Login failed' });
        return;
      }

      // Success: store token and role
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      setAuthenticated(true);
      setUserRole(data.user.role); // Update context

      setFeedback({ type: 'success', text: data.message });

      // Redirect based on role
      if (data.user.role === 'admin') {
        navigate('/admindashboard');
      } else {
        navigate('/dashboard');
      }

    } catch (err) {
      console.error(err);
      setFeedback({ type: 'error', text: 'Network error, please try again.' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <form onSubmit={handleLogin} className="bg-gray-50 p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        {feedback && (
          <div
            className={`p-2 mb-4 text-center rounded ${feedback.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
          >
            {feedback.text}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
