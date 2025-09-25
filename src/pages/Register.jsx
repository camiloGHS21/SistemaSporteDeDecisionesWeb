import React from 'react';
import RegisterHeader from '@components/register/RegisterHeader'
import RegisterForm from '@components/register/RegisterForm'
import RegisterFooter from '@components/register/RegisterFooter'


const Register = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen px-[544px] py-[86px] bg-[#f8f9fa] p-4">
        <div
          className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden gap-6 p-8 rounded-lg bg-white"
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

