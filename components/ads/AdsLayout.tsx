import React from 'react';
import { Outlet } from 'react-router-dom';
import AdMinimalHeader from './AdMinimalHeader';
import AdMinimalFooter from './AdMinimalFooter';

const AdsLayout: React.FC = () => {
  return (
    <>
      <AdMinimalHeader />
      <div className="pt-16 md:pt-[4.25rem]">
        <Outlet />
      </div>
      <AdMinimalFooter />
    </>
  );
};

export default AdsLayout;
