import React, { useState } from 'react';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-black">
      <AuthCard title="Login">
        <form onSubmit={handleLogin}>
          <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <SubmitButton label="Login" />
        </form>
      </AuthCard>
    </div>
  );
};

export default Login;
