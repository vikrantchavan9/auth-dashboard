import React, { useState } from 'react';
import AuthCard from '../components/AuthCard';
import InputField from '../components/InputField';
import SubmitButton from '../components/SubmitButton';

const Register: React.FC = () => {
     const [username, setUsername] = useState('');
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const handleRegister = async (e: React.FormEvent) => {
          e.preventDefault();

          const response = await fetch('http://localhost:3000/users/register', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();
          console.log(data);
     };

     return (
          <div className="h-screen flex items-center justify-center bg-black">
               <AuthCard title="Register">
                    <form onSubmit={handleRegister}>
                         <InputField label="Username" type="text" value={username} onChange={e => setUsername(e.target.value)} />
                         <InputField label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
                         <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                         <SubmitButton label="Register" />
                    </form>
               </AuthCard>
          </div>
     );
};

export default Register;
