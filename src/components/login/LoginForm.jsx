import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Import useAuth

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        login(data.token); // Use the login function from context
        navigate('/comparar');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error al iniciar sesión');
      }
    } catch (error) {
      setError('No se pudo conectar al servidor');
    }
  };

  return (
    <form className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6" onSubmit={handleSubmit}>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="email"
          placeholder="Correo Electronico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <p className="text-sm font-medium text-left text-red-600">Contraseña incorrecta o usuario no registrado.</p>}
      <div className="flex justify-end items-center self-stretch">
        <p className="text-sm font-medium text-left text-blue-600">¿Olvidaste tu contraseña?</p>
      </div>
      <button type="submit" className="flex justify-center items-center self-stretch px-4 py-3 rounded-md bg-blue-600">
        <span className="text-sm font-semibold text-center text-white">iniciar sesión</span>
      </button>
    </form>
  );
};

export default LoginForm;