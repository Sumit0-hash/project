import React from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <DollarSign className="h-6 w-6 mr-2" />
              <span className="font-bold text-xl">FinEdu</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering financial literacy through interactive education and practical tools.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <li><Link to="/budget-simulator" className="text-gray-300 hover:text-white transition-colors">Budget Simulator</Link></li>
              <li><Link to="/investment-calculator" className="text-gray-300 hover:text-white transition-colors">Investment Calculator</Link></li>
              <li><Link to="/financial-assessment" className="text-gray-300 hover:text-white transition-colors">Financial Assessment</Link></li>
              <li><Link to="/learning-modules" className="text-gray-300 hover:text-white transition-colors">Learning Modules</Link></li>
              <li><Link to="/expense-tracker" className="text-gray-300 hover:text-white transition-colors">Expense Tracker</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Glossary</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest financial tips and updates.
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm">© 2025 FinEdu. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;