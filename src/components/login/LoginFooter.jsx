import React from 'react';
import { Link } from 'react-router-dom';
const LoginFooter = () => {
  return (
    <div className="flex flex-col justify-start items-center w-full gap-2">
      <div className="flex justify-center items-center">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register"className="font-medium text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
      <div className="flex justify-center items-center">
        <p className="text-sm font-medium text-center text-blue-600">
          política de privacidad
        </p>
      </div>
    </div>
  );
};

export default LoginFooter;