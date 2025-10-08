import React from 'react';
import RegisterHeader from '../components/register/RegisterHeader'
import RegisterForm from '../components/register/RegisterForm'
import RegisterFooter from '../components/register/RegisterFooter'
import AccessibilityBar from '../components/common/AccessibilityBar';


const Register = () => {
  return (
    <div>
      <AccessibilityBar />
      <div className="flex flex-col justify-center items-center min-h-screen px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4 sm:py-8 md:py-12 lg:py-16 bg-[#f8f9fa]">
        <div
          className="flex flex-col justify-center items-center w-full max-w-md flex-grow-0 flex-shrink-0 relative overflow-hidden gap-6 p-8 rounded-lg bg-white"
          style={{ boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)" }}
        >
          <RegisterHeader />
          <RegisterForm />
          <RegisterFooter />
        </div>
      </div>
    </div>
  );
};

export default Register;

