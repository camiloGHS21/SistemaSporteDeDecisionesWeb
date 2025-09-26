import React from 'react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-[448px] gap-6">
      <div
        className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 rounded-md bg-white/0"
        style={{ boxShadow: "0px 1px 2px 0 rgba(0,0,0,0.05)" }}
      >
        <input className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[13px] py-[15px] rounded-md bg-white border border-gray-300" type='email' placeholder='Correo Electronico'/>
        
        
        <input className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 overflow-hidden px-[13px] py-[15px] rounded-md bg-white border border-gray-300" type={'password'} placeholder='Contraseña'/>
         
        
      </div>
      <div className="flex justify-end items-center self-stretch flex-grow-0 flex-shrink-0">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0">
          <div className="flex justify-start items-start flex-grow-0 flex-shrink-0 relative">
            <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-blue-600">
              ¿Olvidaste tu contraseña?
            </p>
          </div>
        </div>
      </div>
      <button className="flex justify-center items-start self-stretch flex-grow-0 flex-shrink-0 relative px-[17px] py-[13px] rounded-md bg-blue-600">
        <p className="flex-grow w-[414px] text-sm font-semibold text-center text-white">
          Inicia Seccion
        </p>
      </button>
      
    </div>
  );
};

export default LoginForm;