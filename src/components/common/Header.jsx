import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const location = useLocation();
  const { isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex justify-between items-center self-stretch flex-grow-0 flex-shrink-0 relative px-10 py-4 border-t-0 border-r-0 border-b border-l-0 border-gray-200">
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative gap-3">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 w-8 h-8" />
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
            d="M2.66675 2.66667H11.5557V11.5556H20.4445V20.4444H29.3334V29.3333H2.66675V2.66667Z"
            fill="#1173D4"
          />
        </svg>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
          <p className="flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-gray-900">
            Perspectivas políticas
          </p>
        </div>
      </div>
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-8">
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
          <Link to="/comparar" className={`flex-grow-0 flex-shrink-0 text-sm font-semibold text-left ${isActiveRoute('/comparar') ? 'text-[#1173d4]' : 'text-slate-600'}`}>
            Comparar
          </Link>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
          <Link to="/informe" className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-left ${isActiveRoute('/informe') ? 'text-[#1173d4]' : 'text-slate-600'}`}>
            Informes
          </Link>
        </div>
        <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
          <Link to="/recursos" className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-left ${isActiveRoute('/recursos') ? 'text-[#1173d4]' : 'text-slate-600'}`}>
            Recursos
          </Link>
        </div>
        {isAdmin && (
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
            <Link to="/admin" className={`flex-grow-0 flex-shrink-0 text-sm font-medium text-left ${isActiveRoute('/admin') ? 'text-[#1173d4]' : 'text-slate-600'}`}>
              Admin
            </Link>
          </div>
        )}
      </div>
      <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 gap-4">
        <div className="flex justify-center items-center flex-grow-0 flex-shrink-0 w-10 h-10 rounded-full">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative">
            <svg
              width={24}
              height={28}
              viewBox="0 0 24 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-grow-0 flex-shrink-0 w-[24.01px] h-[27.99px] relative"
              preserveAspectRatio="none"
            >
              <path
                d="M4.22546 20.8027V18.8591H6.1691V12.0564C6.1691 10.712 6.57402 9.51749 7.38387 8.47278C8.19372 7.42808 9.24652 6.74376 10.5423 6.41982V5.73955C10.5423 5.33462 10.684 4.99044 10.9674 4.70699C11.2509 4.42354 11.5951 4.28182 12 4.28182C12.4049 4.28182 12.7491 4.42354 13.0326 4.70699C13.316 4.99044 13.4577 5.33462 13.4577 5.73955V6.41982C14.7535 6.74376 15.8063 7.42808 16.6161 8.47278C17.426 9.51749 17.8309 10.712 17.8309 12.0564V18.8591H19.7745V20.8027H4.22546ZM12 23.7182C11.4655 23.7182 11.0079 23.5279 10.6273 23.1472C10.2467 22.7666 10.0564 22.309 10.0564 21.7745H13.9436C13.9436 22.309 13.7533 22.7666 13.3727 23.1472C12.9921 23.5279 12.5345 23.7182 12 23.7182ZM8.11273 18.8591H15.8873V12.0564C15.8873 10.9874 15.5066 10.0722 14.7454 9.31098C13.9841 8.54972 13.069 8.16909 12 8.16909C10.931 8.16909 10.0159 8.54972 9.25462 9.31098C8.49336 10.0722 8.11273 10.9874 8.11273 12.0564V18.8591Z"
                fill="#64748B"
              />
            </svg>
          </div>
        </div>
        <button onClick={handleLogout} className="cursor-pointer">
          <img
            src="userIcon.png"
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;