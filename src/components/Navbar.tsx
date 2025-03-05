import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, DollarSign } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-indigo-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <DollarSign className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">FinEdu</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/budget-simulator" className="px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Budget Simulator
            </Link>
            <Link to="/investment-calculator" className="px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Investment Calculator
            </Link>
            <Link to="/financial-assessment" className="px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Financial Assessment
            </Link>
            <Link to="/learning-modules" className="px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Learning Modules
            </Link>
            <Link to="/expense-tracker" className="px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors">
              Expense Tracker
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/budget-simulator" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Budget Simulator
            </Link>
            <Link 
              to="/investment-calculator" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Investment Calculator
            </Link>
            <Link 
              to="/financial-assessment" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Financial Assessment
            </Link>
            <Link 
              to="/learning-modules" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Learning Modules
            </Link>
            <Link 
              to="/expense-tracker" 
              className="block px-3 py-2 rounded-md hover:bg-indigo-700 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Expense Tracker
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;