import React from 'react';

const EmptyPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <img
        className="relative -translate-y-1/3 transform"
        src="/assets/shipmatelogo.png"
        alt="로고"
      />
      <p className="absolute font-body-1 font-bold">🐑 개발중입니다! 🐑</p>
    </div>
  );
};

export default EmptyPage;
