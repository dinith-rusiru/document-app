import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FolderIcon, UserIcon, TagIcon, BrainIcon, MenuIcon, XIcon } from 'lucide-react';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navItems = [{
    name: 'Home',
    path: '/',
    icon: <FolderIcon className="w-5 h-5" />
  }, {
    name: 'Profile Wizard',
    path: '/profile-wizard',
    icon: <UserIcon className="w-5 h-5" />
  }, {
    name: 'Document Categorizer',
    path: '/document-categorizer',
    icon: <TagIcon className="w-5 h-5" />
  }, {
    name: 'Smart Recommendations',
    path: '/smart-recommendations',
    icon: <BrainIcon className="w-5 h-5" />
  }];
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-blue-600">DocManager</span>
          </div>
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map(item => <Link key={item.name} to={item.path} className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>)}
          </div>
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button onClick={toggleMenu} className="p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none">
              {isMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isMenuOpen && <div className="md:hidden bg-white pb-3 px-2 space-y-1">
          {navItems.map(item => <Link key={item.name} to={item.path} className={`flex items-center px-3 py-2 rounded-md text-base font-medium ${location.pathname === item.path ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => setIsMenuOpen(false)}>
              <span className="mr-3">{item.icon}</span>
              {item.name}
            </Link>)}
        </div>}
    </nav>;
};
export default Navbar;