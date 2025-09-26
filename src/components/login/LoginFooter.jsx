import React from 'react';
import { Link } from 'react-router-dom';

const LoginFooter = () => {
  return (
    <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[448px] gap-2">
      <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative space-x-[-8.526512829121202e-14px]">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-gray-600">
          ¿No tienes una cuenta?&nbsp;
        </p>
      <div className="flex justify-center items-center self-stretch">
        <p className="text-sm text-gray-600">
          ¿No tienes una cuenta?{' '}
          <Link to="/register" className="font-medium text-blue-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
      </div>
      <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0">
        <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
          <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-blue-600">
            política de privacidad
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginFooter;