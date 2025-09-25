import React from 'react';

const RegisterHeader = () => {
  return (
    <div className="self-stretch flex-grow-0 flex-shrink-0 h-32 relative">
      <div className="flex justify-start items-start absolute left-[152px] top-0 p-3 rounded-lg bg-white">
        <svg
          width={32}
          height={32}
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-8 h-8 relative"
          preserveAspectRatio="none"
        >
          <path
            d="M2.6665 2.66666H11.5554V11.5556H20.4442V20.4444H29.3332V29.3333H2.6665V2.66666Z"
            fill="#1173D4"
          />
        </svg>
      </div>
      <div className="flex flex-col justify-start items-center w-[360px] absolute left-0 top-[72px]">
        <p className="flex-grow-0 flex-shrink-0 text-2xl font-bold text-center text-[#212529]">
          Perspectivas políticas
        </p>
      </div>
      <div className="flex flex-col justify-start items-center w-[360px] absolute left-0 top-[104px]">
        <p className="flex-grow-0 flex-shrink-0 text-base text-center text-[#6c757d]">
          Crea una cuenta para continuar
        </p>
      </div>
    </div>
  );
};

export default RegisterHeader;
