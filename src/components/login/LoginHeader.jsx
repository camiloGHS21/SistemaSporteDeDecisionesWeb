import React from 'react';

const LoginHeader = () => {
  return (
    <div className="flex-grow-0 flex-shrink-0 w-[448px] h-[136px] relative">
      <div className="flex justify-center items-start w-[448px] absolute left-0 top-0">
        <svg
          width={48}
          height={48}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="flex-grow-0 flex-shrink-0 w-12 h-12 relative"
          preserveAspectRatio="none"
        >
          <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="#2563EB" />
        </svg>
      </div>
      <div className="flex flex-col justify-start items-center w-[448px] absolute left-0 top-[72px]">
        <p className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-center text-gray-900">
          <span className="flex-grow-0 flex-shrink-0 text-3xl font-bold text-center text-gray-900">
            Perspectivas políticas
          </span>
          <br />
        </p>
      </div>
      <div className="flex flex-col justify-start items-center w-[448px] absolute left-0 top-[116px]">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-gray-600">
          Inicia sesión en tu cuenta
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;