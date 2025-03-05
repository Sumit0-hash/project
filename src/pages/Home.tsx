import { Link } from 'react-router-dom';
import { 
  PieChart, 
  TrendingUp, 
  BarChart2, 
  BookOpen, 
  DollarSign,
  ArrowRight
} from 'lucide-react';

interface FeatureCardProps {
  icon: JSX.Element;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, link, linkText }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-indigo-600 font-medium flex items-center hover:text-indigo-800 transition-colors">
        {linkText} <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Master Your Finances</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Interactive tools and personalized education to help you build financial confidence and security.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/financial-assessment" 
                className="bg-white text-indigo-600 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 transition-colors"
              >
                Take Financial Assessment
              </Link>
              <Link 
                to="/learning-modules" 
                className="bg-transparent border-2 border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-white hover:text-indigo-600 transition-colors"
              >
                Explore Learning Modules
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Financial Tools</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical applications to help you understand and improve your financial situation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<PieChart className="h-6 w-6" />}
              title="Budget Simulator"
              description="Create personalized budgets with visual breakdowns and 'what if' scenario modeling."
              link="/budget-simulator"
              linkText="Create Your Budget"
            />
            
            <FeatureCard 
              icon={<TrendingUp className="h-6 w-6" />}
              title="Investment Calculator"
              description="Visualize compound interest and compare different investment strategies."
              link="/investment-calculator"
              linkText="Calculate Growth"
            />
            
            <FeatureCard 
              icon={<BarChart2 className="h-6 w-6" />}
              title="Financial Assessment"
              description="Evaluate your financial health and get personalized recommendations."
              link="/financial-assessment"
              linkText="Assess Your Finances"
            />
            
            <FeatureCard 
              icon={<BookOpen className="h-6 w-6" />}
              title="Learning Modules"
              description="Interactive lessons on key financial concepts with progress tracking."
              link="/learning-modules"
              linkText="Start Learning"
            />
            
            <FeatureCard 
              icon={<DollarSign className="h-6 w-6" />}
              title="Expense Tracker"
              description="Track your spending patterns and get insights to improve your habits."
              link="/expense-tracker"
              linkText="Track Expenses"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
