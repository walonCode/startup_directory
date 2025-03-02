import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
        {/* Quick Links */}
        <div className="flex flex-col items-center justify-center">
          <h3 className="font-bold text-xl">Quick Links</h3>
          <ul className='flex gap-4 '>
            <li>
              <Link to="/" className="hover:text-green-600">Home</Link>
            </li>
            <li>
              <Link to="startup" className="hover:text-green-600">Create</Link>
            </li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="space-x-4 mt-1 flex items-center justify-center">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-green-600 hover:text-white text-2xl" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-green-600 hover:text-white text-2xl" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-green-600 hover:text-white text-2xl" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="text-green-600 hover:text-white text-2xl" />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm text-gray-400 mt-1">
        &copy; 2025 Startup Directory. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
