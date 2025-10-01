import React from 'react';

const LoginHeader = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <svg
        width={48}
        height={48}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="#2563EB" />
      </svg>
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center text-gray-900">
          Perspectivas políticas
        </h1>
        <p className="text-sm text-center text-gray-600">
          Inicia sesión en tu cuenta
        </p>
      </div>
    </div>
  );
};

export default LoginHeader;