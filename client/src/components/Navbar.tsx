import { useState } from 'react';
import { FaHome,  FaPlusCircle,FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between ">
        {/* Logo */}
        <div className="text-2xl font-bold text-green-600"><Link to='/'>Startup Directory</Link></div>

        {/* Links */}
        <div className="hidden md:flex items-center
         space-x-6 text-lg">
          <Link to="/" className="hover:text-green-600">
            <FaHome className="inline-block mr-2" /> Home
          </Link>
          <Link to="startup" className="hover:text-green-600">
            <FaPlusCircle className="inline-block mr-2" /> Create
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <FaBars />
          </button>
        </div>
      </div>
      {isOpen && (
          <div className="flex flex-col items-start gap-1 px-6 mx-auto  md:hidden 
         space-x-6 text-lg">
          <Link to="/" className="hover:text-green-600">
            <FaHome className="inline-block mr-2" /> Home
          </Link>
          <Link to="startup" className="hover:text-green-600 mb-3">
            <FaPlusCircle className="inline-block mr-2" /> Create
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
