import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Plus, Trash2, IndianRupee, PieChart as PieChartIcon, BarChart2 } from 'lucide-react';

// Default expense categories
const defaultCategories = [
  { id: 1, name: 'Housing', color: '#FF6384' },
  { id: 2, name: 'Transportation', color: '#36A2EB' },
  { id: 3, name: 'Food', color: '#FFCE56' },
  { id: 4, name: 'Utilities', color: '#4BC0C0' },
  { id: 5, name: 'Healthcare', color: '#9966FF' },
  { id: 6, name: 'Entertainment', color: '#FF9F40' },
  { id: 7, name: 'Savings', color: '#8AC926' },
  { id: 8, name: 'Other', color: '#A0A0A0' }
];

// Random color generator for new categories
const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const BudgetSimulator = () => {
  // State for income sources
  const [incomeSources, setIncomeSources] = useState([
    { id: 1, name: 'Primary Job', amount: 4000 }
  ]);
  
  // State for expense categories and amounts
  const [categories, setCategories] = useState(defaultCategories);
  const [expenses, setExpenses] = useState([
    { id: 1, categoryId: 1, amount: 1200, description: 'Rent' },
    { id: 2, categoryId: 2, amount: 400, description: 'Car payment' },
    { id: 3, categoryId: 3, amount: 500, description: 'Groceries' },
    { id: 4, categoryId: 4, amount: 200, description: 'Electricity & Water' },
    { id: 5, categoryId: 5, amount: 150, description: 'Health insurance' },
    { id: 6, categoryId: 6, amount: 200, description: 'Dining out & Movies' },
    { id: 7, categoryId: 7, amount: 500, description: 'Emergency fund' }
  ]);
  
  // State for view type (monthly, weekly, annual)
  const [viewType, setViewType] = useState('monthly');
  
  // State for chart type
  const [chartType, setChartType] = useState('pie');
  
  // State for savings goal
  const [savingsGoal, setSavingsGoal] = useState(10000);
  const [currentSavings, setCurrentSavings] = useState(2000);
  
  // Calculate totals
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [netIncome, setNetIncome] = useState(0);
  
  // Update calculations when income or expenses change
  useEffect(() => {
    const calcTotalIncome = incomeSources.reduce((sum, source) => sum + Number(source.amount), 0);
    const calcTotalExpenses = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    
    let multiplier = 1;
    if (viewType === 'weekly') multiplier = 12/52;
    if (viewType === 'annual') multiplier = 12;
    
    setTotalIncome(calcTotalIncome * multiplier);
    setTotalExpenses(calcTotalExpenses * multiplier);
    setNetIncome((calcTotalIncome - calcTotalExpenses) * multiplier);
  }, [incomeSources, expenses, viewType]);
  
  // Add new income source
  const addIncomeSource = () => {
    const newId = incomeSources.length > 0 ? Math.max(...incomeSources.map(source => source.id)) + 1 : 1;
    setIncomeSources([...incomeSources, { id: newId, name: 'New Income', amount: 0 }]);
  };
  
  // Update income source
  const updateIncomeSource = (id, field, value) => {
    setIncomeSources(incomeSources.map(source => 
      source.id === id ? { ...source, [field]: field === 'amount' ? Number(value) : value } : source
    ));
  };
  
  // Remove income source
  const removeIncomeSource = (id) => {
    setIncomeSources(incomeSources.filter(source => source.id !== id));
  };
  
  // Add new expense
  const addExpense = () => {
    const newId = expenses.length > 0 ? Math.max(...expenses.map(expense => expense.id)) + 1 : 1;
    setExpenses([...expenses, { 
      id: newId, 
      categoryId: categories[0].id, 
      amount: 0, 
      description: 'New Expense' 
    }]);
  };
  
  // Update expense
  const updateExpense = (id, field, value) => {
    setExpenses(expenses.map(expense => 
      expense.id === id ? { 
        ...expense, 
        [field]: field === 'amount' ? Number(value) : field === 'categoryId' ? Number(value) : value 
      } : expense
    ));
  };
  
  // Remove expense
  const removeExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };
  
  // Add new category
  const addCategory = () => {
    const newId = categories.length > 0 ? Math.max(...categories.map(cat => cat.id)) + 1 : 1;
    setCategories([...categories, { 
      id: newId, 
      name: 'New Category', 
      color: getRandomColor() 
    }]);
  };
  
  // Update category
  const updateCategory = (id, field, value) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, [field]: value } : category
    ));
  };
  
  // Remove category (and associated expenses)
  const removeCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
    setExpenses(expenses.filter(expense => expense.categoryId !== id));
  };
  
  // Prepare data for charts
  const chartData = categories.map(category => {
    const categoryExpenses = expenses.filter(expense => expense.categoryId === category.id);
    const totalAmount = categoryExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    
    let multiplier = 1;
    if (viewType === 'weekly') multiplier = 12/52;
    if (viewType === 'annual') multiplier = 12;
    
    return {
      name: category.name,
      value: totalAmount * multiplier,
      color: category.color
    };
  }).filter(item => item.value > 0);
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Interactive Budget Simulator</h1>
      
      {/* View Type Selector */}
      <div className="mb-8 flex justify-center">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
              viewType === 'monthly' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setViewType('monthly')}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium ${
              viewType === 'weekly' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setViewType('weekly')}
          >
            Weekly
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
              viewType === 'annual' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setViewType('annual')}
          >
            Annual
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Income and Expenses Section */}
        <div>
          {/* Income Sources */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <IndianRupee className="h-5 w-5 mr-2 text-green-500" />
              Income Sources
            </h2>
            
            <div className="space-y-4">
              {incomeSources.map(source => (
                <div key={source.id} className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={source.name}
                    onChange={(e) => updateIncomeSource(source.id, 'name', e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Income Source"
                  />
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    ₹
                    </span>
                    <input
                      type="number"
                      value={source.amount}
                      onChange={(e) => updateIncomeSource(source.id, 'amount', e.target.value)}
                      className="w-32 pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Amount"
                      min="0"
                    />
                  </div>
                  <button 
                    onClick={() => removeIncomeSource(source.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={incomeSources.length <= 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={addIncomeSource}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-5 w-5 mr-1" /> Add Income Source
              </button>
            </div>
          </div>
          
          {/* Expense Categories */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Expense Categories</h2>
            
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.id} className="flex items-center space-x-4">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <input
                    type="text"
                    value={category.name}
                    onChange={(e) => updateCategory(category.id, 'name', e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Category Name"
                  />
                  <input
                    type="color"
                    value={category.color}
                    onChange={(e) => updateCategory(category.id, 'color', e.target.value)}
                    className="w-10 h-10 p-1 border border-gray-300 rounded-md"
                  />
                  <button 
                    onClick={() => removeCategory(category.id)}
                    className="text-red-500 hover:text-red-700"
                    disabled={categories.length <= 1}
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={addCategory}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-5 w-5 mr-1" /> Add Category
              </button>
            </div>
          </div>
          
          {/* Expenses */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Expenses</h2>
            
            <div className="space-y-4">
              {expenses.map(expense => (
                <div key={expense.id} className="flex items-center space-x-4">
                  <select
                    value={expense.categoryId}
                    onChange={(e) => updateExpense(expense.id, 'categoryId', e.target.value)}
                    className="w-40 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={expense.description}
                    onChange={(e) => updateExpense(expense.id, 'description', e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Description"
                  />
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                    ₹
                    </span>
                    <input
                      type="number"
                      value={expense.amount}
                      onChange={(e) => updateExpense(expense.id, 'amount', e.target.value)}
                      className="w-32 pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Amount"
                      min="0"
                    />
                  </div>
                  <button 
                    onClick={() => removeExpense(expense.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              
              <button 
                onClick={addExpense}
                className="flex items-center text-indigo-600 hover:text-indigo-800"
              >
                <Plus className="h-5 w-5 mr-1" /> Add Expense
              </button>
            </div>
          </div>
        </div>
        
        {/* Visualization Section */}
        <div>
          {/* Budget Summary */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Budget Summary</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Income</p>
                <p className="text-2xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Total Expenses</p>
                <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
              </div>
              <div className={`p-4 rounded-lg ${netIncome >= 0 ? 'bg-blue-50' : 'bg-yellow-50'}`}>
                <p className="text-sm text-gray-600 mb-1">Net Income</p>
                <p className={`text-2xl font-bold ${netIncome >= 0 ? 'text-blue-600' : 'text-yellow-600'}`}>
                ₹{netIncome.toFixed(2)}
                </p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Savings Goal Progress</p>
              <div className="flex items-center space-x-4">
                <div className="flex-grow">
                  <div className="w-full bg-gray-200 rounded-full h-4">
                    <div 
                      className="bg-green-600 h-4 rounded-full" 
                      style={{ width: `${Math.min(100, (currentSavings / savingsGoal) * 100)}%` }}
                    ></div>
                  </div>
                </div>
                <p className="text-sm font-medium">
                ₹{currentSavings.toFixed(0)} / ₹{savingsGoal.toFixed(0)}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Savings
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Savings Goal
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    value={savingsGoal}
                    onChange={(e) => setSavingsGoal(Number(e.target.value))}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart Type Selector */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Expense Breakdown</h2>
              <div className="flex space-x-2">
                <button
                  onClick={() => setChartType('pie')}
                  className={`p-2 rounded-md ${
                    chartType === 'pie' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <PieChartIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-md ${
                    chartType === 'bar' 
                      ? 'bg-indigo-100 text-indigo-600' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <BarChart2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            
            <div className="h-80">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
                      />
                    </PieChart>
                  ) : (
                    <BarChart
                      data={chartData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']} />
                      <Legend />
                      <Bar dataKey="value" name="Amount">
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <p className="text-gray-500">Add expenses to see the breakdown</p>
                </div>
              )}
            </div>
          </div>
          
          {/* What-if Scenario */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">"What If" Scenario</h2>
            <p className="text-gray-600 mb-4">
              See how changes to your income or expenses would affect your budget.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  If I increased my income by:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Amount"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  If I reduced my expenses by:
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Amount"
                    min="0"
                  />
                </div>
              </div>
              
              <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                Calculate Impact
              </button>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  With these changes, your monthly net income would be <span className="font-semibold">₹{netIncome.toFixed(2)}</span> and you could reach your savings goal in <span className="font-semibold">X months</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSimulator;