import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import AccessibilityBar from './AccessibilityBar';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <AccessibilityBar />
      <Header />
      <Outlet />
    </div>
  );
};

export default MainLayout;
