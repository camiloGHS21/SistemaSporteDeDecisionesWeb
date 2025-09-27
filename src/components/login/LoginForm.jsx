import React from 'react';

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="email"
          placeholder="Correo Electronico"
        />
        <input
          className="self-stretch px-3.5 py-4 rounded-md border border-gray-300"
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <div className="flex justify-end items-center self-stretch">
        <p className="text-sm font-medium text-left text-blue-600">¿Olvidaste tu contraseña?</p>
      </div>
      <button className="flex justify-center items-center self-stretch px-4 py-3 rounded-md bg-blue-600">
        <a href='/comparar' className="text-sm font-semibold text-center text-white">iniciar sesión</a>
      </button>
    </div>
  );
};

export default LoginForm;