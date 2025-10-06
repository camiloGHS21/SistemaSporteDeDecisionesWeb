import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    let valid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setApiError('');

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, introduce un email válido.');
      valid = false;
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    }

    if (valid) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nombre_usuario: username,
            email: email,
            contrasena_hash: password,
          }),
        });

        if (response.ok) {
          // Handle successful registration
          console.log('Registro exitoso!');
          navigate('/'); // Redirect to login page
        } else {
          const errorData = await response.json();
          setApiError(errorData.message || 'Error en el registro. Inténtalo de nuevo.');
        }
      } catch (error) {
        console.error('Error de red:', error);
        setApiError('No se pudo conectar al servidor. Inténtalo más tarde.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
      <input className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Nombre de usuario' value={username} onChange={(e) => setUsername(e.target.value)} required />
       
      <input className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Correo electrónico' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
      {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        
      <input  className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Contraseña' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
      {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
      {apiError && <p className="text-red-500 text-xs"></p>}
      <button type="submit" className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-2 rounded-md bg-[#4263eb] text-white font-semibold text-base w-full">
        Regístrate
      </button>
    </form>
  );
};

export default RegisterForm;
