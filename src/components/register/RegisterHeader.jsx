import React from 'react';

const RegisterHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4">
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
      <div className="flex flex-col justify-start items-center">
        <p className="flex-grow-0 flex-shrink-0 text-2xl sm:text-3xl font-bold text-center text-gray-900">
          Perspectivas políticas
        </p>
      </div>
      <div className="flex flex-col justify-start items-center">
        <p className="flex-grow-0 flex-shrink-0 text-sm text-center text-gray-600">
          Crea una cuenta
        </p>
      </div>
    </div>
  );
};

export default RegisterHeader;