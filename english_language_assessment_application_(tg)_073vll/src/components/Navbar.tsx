import React from 'react';
import RethaGoLogo from './RethaGoLogo';

const Navbar = () => {
  return (
    <header className="bg-white shadow-md p-4 text-center">
      <div className="flex justify-center">
        <RethaGoLogo />
      </div>
    </header>
  );
};

export default Navbar;
