"use client"

import { useState } from "react"
import { FaHome, FaPlusCircle, FaBars, FaTimes } from "react-icons/fa"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black text-white shadow-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/" className="flex items-center gap-2">
            <span className="bg-green-600 text-white p-1.5 rounded-lg">FS</span>
            <span className="bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
              Freetown Startup
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-lg">
          <Link
            to="/"
            className="flex items-center gap-2 py-2 px-3 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:text-green-400"
          >
            <FaHome className="text-green-500" />
            <span>Home</span>
          </Link>
          <Link
            to="startup"
            className="flex items-center gap-2 py-2 px-4 rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-300 shadow-md"
          >
            <FaPlusCircle />
            <span>Create</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors focus:outline-none"
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-800 animate-fadeIn">
          <div className="flex flex-col px-6 py-3 space-y-4">
            <Link
              to="/"
              className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-800 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FaHome className="text-green-500 text-xl" />
              <span>Home</span>
            </Link>
            <Link
              to="startup"
              className="flex items-center gap-3 py-3 px-4 mb-3 rounded-lg bg-green-600 hover:bg-green-700 transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              <FaPlusCircle className="text-xl" />
              <span>Create</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
