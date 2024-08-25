import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
  text?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, text }) => {
  return (
    <div className="flex gap-4 min-h-screen relative px-4 py-3 bg-[#f4e4dc]">
      <div className="bg-[url(/abstract.jpg)] auth-bg max-sm:hidden w-[45%] text-white rounded-[30px] p-10  flex flex-col justify-center items-center">
        <a href="/" className="absolute left-10 top-10 z-10">
          <img className="w-24" src="/40andfab.png" alt="logo" />
        </a>
        <div className="text-center flex flex-col justify-center items-center flex-1">
          <h2 className="text-lg lg:text-2xl font-bold z-10">
            {text}
          </h2>
        </div>
      </div>

      <div className="w-full sm:w-7/12 m-auto flex flex-col justify-center items-center" >
        <a href="/" className="self-start mb-6 sm:hidden">
          <img className="w-24" src="/40andfab.png" alt="logo" />
        </a>

        <div className="flex flex-col justify-center items-center h-full w-full max-w-lg">
          {children}
        </div>

      </div>
    </div>
  );
};

export default AuthLayout;
