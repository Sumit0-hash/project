import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import BudgetSimulator from './pages/BudgetSimulator';
import InvestmentCalculator from './pages/InvestmentCalculator';
import FinancialAssessment from './pages/FinancialAssessment';
import LearningModules from './pages/LearningModules';
import ExpenseTracker from './pages/ExpenseTracker';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/budget-simulator" element={<BudgetSimulator />} />
            <Route path="/investment-calculator" element={<InvestmentCalculator />} />
            <Route path="/financial-assessment" element={<FinancialAssessment />} />
            <Route path="/learning-modules" element={<LearningModules />} />
            <Route path="/expense-tracker" element={<ExpenseTracker />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
