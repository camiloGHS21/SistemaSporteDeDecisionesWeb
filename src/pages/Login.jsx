import React from 'react';
import LoginHeader from '../components/login/LoginHeader';
import LoginForm from '../components/login/LoginForm';
import LoginFooter from '../components/login/LoginFooter';
import AccessibilityBar from '../components/common/AccessibilityBar';

const Login = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen gap-2.5 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-16 sm:py-24 md:py-32 bg-[#f8f9fa]">
      <AccessibilityBar />
      <div className="flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 w-full max-w-md gap-8 p-8 bg-white rounded-lg shadow-md">
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  );
};

export default Login;