import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ProductHub</h3>
            <p className="text-sm text-gray-500">
              Simplify product management with our easy-to-use platform.
            </p>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-500 hover:text-primary transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-500 hover:text-primary transition-colors">Products</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-500 hover:text-primary transition-colors">About</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">Contact Support</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">Documentation</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-md font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-500 hover:text-primary transition-colors">Terms of Service</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} ProductHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
