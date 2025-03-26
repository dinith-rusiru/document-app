import React from 'react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-white shadow-inner py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div>
            <p>&copy; {currentYear} DocManager. All rights reserved.</p>
          </div>
          <div className="mt-2 md:mt-0">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Terms
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;