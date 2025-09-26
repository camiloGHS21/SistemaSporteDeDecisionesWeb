import React, { useState } from 'react';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    let valid = true;

    // Email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Por favor, introduce un email válido.');
      valid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (password.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres.');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (valid) {
      console.log('Formulario válido, enviando datos...', { username, email, password });
      // Aquí iría la lógica para registrar al usuario
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
      <input className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Nombre de usuario' value={username} onChange={(e) => setUsername(e.target.value)} />
       
      <input className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Correo electrónico' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      {emailError && <p className="text-red-500 text-xs">{emailError}</p>}
        
      <input  className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[17px] pt-[11px] pb-3 rounded-md border border-[#ced4da]" placeholder='Contraseña' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      {passwordError && <p className="text-red-500 text-xs">{passwordError}</p>}
     
      <div className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative px-4 py-2 rounded-md bg-[#4263eb]">
        <button type="submit" className="flex-grow w-full text-base font-semibold text-center text-white">
          Regístrate
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
