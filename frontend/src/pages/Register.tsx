import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Register = () => {
     const [formData, setFormData] = useState({
          username: '',
          email: '',
          password: ''
     });

     const [message, setMessage] = useState('');
     const [error, setError] = useState('');

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({ ...formData, [e.target.name]: e.target.value });
     };

     const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setMessage('');
          setError('');

          try {
               const res = await axios.post('http://localhost:3000/users/register', formData);
               setMessage('Registration successful!');
               setFormData({ username: '', email: '', password: '' }); // Clear fields
          } catch (err: any) {
               setError(err.res?.data?.message || 'Registration failed.');
          }
     };

     return (
          <div className="min-h-screen flex items-center justify-center bg-white">
               <form className='bg-gray-50 p-8 rounded shadow-md w-full max-w-sm' onSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                    <input
                         type="text"
                         name="username"
                         placeholder="Username"
                         value={formData.username}
                         onChange={handleChange}
                         className="w-full p-2 mb-3 border rounded"
                         required
                    />
                    <input
                         type="email"
                         name="email"
                         placeholder="Email"
                         value={formData.email}
                         onChange={handleChange}
                         className="w-full p-2 mb-3 border rounded"
                         required
                    />
                    <input
                         type="password"
                         name="password"
                         placeholder="Password"
                         value={formData.password}
                         onChange={handleChange}
                         className="w-full p-2 mb-3 border rounded"
                         required
                    />
                    {message && <p className="text-green-600 bg-green-100 border p-1 border-green-600 mb-3">{message}</p>}
                    {error && <p className="text-red-600 bg-red-100 border border-red-600 p-1 mb-3">{error}</p>}

                    <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
                         Register
                    </button>
                    <p className="mt-4 text-center text-sm">
                         Already have an account?{' '}
                         <Link to="/login" className="text-blue-600 hover:underline">
                              Login
                         </Link>
                    </p>
               </form>
          </div>
     );
};

export default Register;
