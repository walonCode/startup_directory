import { FaHome,  FaPlusCircle, FaInfoCircle,FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-black text-white shadow-md sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between ">
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
          <Link to='/view' className="hover:text-green-600">
            <FaInfoCircle className="inline-block mr-2" /> View
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <FaBars />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
