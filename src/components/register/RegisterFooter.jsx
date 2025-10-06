import React from 'react';
import { Link } from 'react-router-dom';
const RegisterFooter = () => {
  return (
    <div className="flex flex-col justify-start items-center self-stretch flex-grow-0 flex-shrink-0 gap-2">
      <div className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-[8.526512829121202e-14px]">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-[#6c757d]">
          ¿Ya tienes una cuenta?&nbsp;
        </p>
        <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
          <a href="/" className="flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-[#4263eb]">
            Inicia Sesión
          </a>
        </div>
      </div>
      <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
        <Link to="/" className="flex-grow-0 flex-shrink-0 text-xs text-center text-[#4263eb]">
          política de privacidad
        </Link>
      </div>
    </div>
  );
};

export default RegisterFooter;
