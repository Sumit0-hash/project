import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IndianRupee , TrendingUp, AlertTriangle } from 'lucide-react';

const InvestmentCalculator = () => {
  // Investment parameters
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [years, setYears] = useState(20);
  const [rateOfReturn, setRateOfReturn] = useState(7);
  const [inflationRate, setInflationRate] = useState(2.5);
  const [riskTolerance, setRiskTolerance] = useState(3); // 1-5 scale
  
  // Investment types
  const investmentTypes = [
    { id: 'conservative', name: 'Conservative', returnRate: 4, riskLevel: 1, color: '#4BC0C0' },
    { id: 'balanced', name: 'Balanced', returnRate: 7, riskLevel: 3, color: '#36A2EB' },
    { id: 'aggressive', name: 'Aggressive', returnRate: 10, riskLevel: 5, color: '#FF6384' }
  ];
  
  // Selected investment types for comparison
  const [selectedTypes, setSelectedTypes] = useState(['balanced']);
  
  // Retirement goal
  const [retirementGoal, setRetirementGoal] = useState(1000000);
  
  // Chart data
  const [chartData, setChartData] = useState([]);
  
  // Calculate investment growth
  useEffect(() => {
    const calculateGrowth = () => {
      const data = [];
      
      // Calculate for each selected investment type
      selectedTypes.forEach(typeId => {
        const investmentType = investmentTypes.find(type => type.id === typeId);
        const rate = investmentType ? investmentType.returnRate : rateOfReturn;
        
        let balance = initialInvestment;
        let inflationAdjustedBalance = initialInvestment;
        const monthlyRate = rate / 100 / 12;
        const monthlyInflation = inflationRate / 100 / 12;
        
        // Initial year
        data.push({
          year: 0,
          [`${typeId}Balance`]: balance,
          [`${typeId}InflationAdjusted`]: inflationAdjustedBalance
        });
        
        // Calculate for each year
        for (let year = 1; year <= years; year++) {
          // Calculate monthly compounding
          for (let month = 1; month <= 12; month++) {
            balance = balance * (1 + monthlyRate) + monthlyContribution;
            inflationAdjustedBalance = balance / Math.pow(1 + monthlyInflation, year * 12 + month);
          }
          
          // Add data point for this year
          data.push({
            year,
            [`${typeId}Balance`]: Math.round(balance),
            [`${typeId}InflationAdjusted`]: Math.round(inflationAdjustedBalance)
          });
        }
      });
      
      // Merge data for all investment types
      const mergedData = [];
      for (let year = 0; year <= years; year++) {
        const yearData = { year };
        selectedTypes.forEach(typeId => {
          const typeData = data.find(d => d.year === year);
          if (typeData) {
            yearData[`${typeId}Balance`] = typeData[`${typeId}Balance`];
            yearData[`${typeId}InflationAdjusted`] = typeData[`${typeId}InflationAdjusted`];
          }
        });
        mergedData.push(yearData);
      }
      
      setChartData(mergedData);
    };
    
    calculateGrowth();
  }, [initialInvestment, monthlyContribution, years, rateOfReturn, inflationRate, selectedTypes]);
  
  // Toggle investment type selection
  const toggleInvestmentType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      if (selectedTypes.length > 1) {
        setSelectedTypes(selectedTypes.filter(id => id !== typeId));
      }
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };
  
  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Calculate years to reach retirement goal
  const calculateYearsToGoal = () => {
    if (!retirementGoal || retirementGoal <= initialInvestment) return 0;
    
    const selectedType = investmentTypes.find(type => type.id === selectedTypes[0]);
    const rate = selectedType ? selectedType.returnRate : rateOfReturn;
    const monthlyRate = rate / 100 / 12;
    
    let balance = initialInvestment;
    let months = 0;
    
    while (balance < retirementGoal && months < 1200) { // Max 100 years
      balance = balance * (1 + monthlyRate) + monthlyContribution;
      months++;
    }
    
    return months < 1200 ? (months / 12).toFixed(1) : 'over 100';
  };
  
  // Get final balance
  const getFinalBalance = () => {
    if (chartData.length === 0) return 0;
    const finalYear = chartData[chartData.length - 1];
    const typeId = selectedTypes[0];
    return finalYear[`${typeId}Balance`] || 0;
  };
  
  // Get inflation-adjusted final balance
  const getInflationAdjustedBalance = () => {
    if (chartData.length === 0) return 0;
    const finalYear = chartData[chartData.length - 1];
    const typeId = selectedTypes[0];
    return finalYear[`${typeId}InflationAdjusted`] || 0;
  };
  
  // Get risk level description
  const getRiskDescription = (level) => {
    switch(level) {
      case 1: return "Very Low Risk";
      case 2: return "Low Risk";
      case 3: return "Moderate Risk";
      case 4: return "High Risk";
      case 5: return "Very High Risk";
      default: return "Moderate Risk";
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Investment Growth Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Investment Parameters */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <IndianRupee className="h-5 w-5 mr-2 text-green-500" />
              Investment Parameters
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    value={initialInvestment}
                    onChange={(e) => setInitialInvestment(Number(e.target.value))}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Investment Timeline (Years): {years}
                </label>
                <input
                  type="range"
                  min="1"
                  max="40"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>10</span>
                  <span>20</span>
                  <span>30</span>
                  <span>40</span>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Rate of Return (%)
                </label>
                <input
                  type="number"
                  value={rateOfReturn}
                  onChange={(e) => setRateOfReturn(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  step="0.1"
                  min="0"
                  max="30"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Annual Inflation Rate (%)
                </label>
                <input
                  type="number"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  step="0.1"
                  min="0"
                  max="20"
                />
              </div>
            </div>
          </div>
          
          {/* Investment Types */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Investment Types</h2>
            
            <div className="space-y-3">
              {investmentTypes.map(type => (
                <div 
                  key={type.id}
                  className={`p-3 rounded-md cursor-pointer border-2 transition-colors ${
                    selectedTypes.includes(type.id) 
                      ? `border-${type.color.slice(1)} bg-${type.color.slice(1)}10` 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleInvestmentType(type.id)}
                  style={{ 
                    borderColor: selectedTypes.includes(type.id) ? type.color : undefined,
                    backgroundColor: selectedTypes.includes(type.id) ? `${type.color}20` : undefined
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{type.name}</h3>
                    <span className="text-sm font-semibold" style={{ color: type.color }}>
                      {type.returnRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-sm text-gray-600">Risk Level:</div>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map(level => (
                        <div 
                          key={level}
                          className={`w-4 h-4 rounded-full mx-0.5 ${
                            level <= type.riskLevel ? 'bg-gray-700' : 'bg-gray-200'
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Risk Tolerance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
              Risk Tolerance Assessment
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Risk Tolerance: {getRiskDescription(riskTolerance)}
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={riskTolerance}
                  onChange={(e) => setRiskTolerance(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Very Low</span>
                  <span>Low</span>
                  <span>Moderate</span>
                  <span>High</span>
                  <span>Very High</span>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-600">
                  Based on your risk tolerance, a <span className="font-semibold">
                    {riskTolerance <= 2 ? 'Conservative' : riskTolerance <= 4 ? 'Balanced' : 'Aggressive'}
                  </span> investment strategy may be suitable for you.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Growth Chart and Results */}
        <div className="lg:col-span-2">
          {/* Growth Chart */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
              Investment Growth Over Time
            </h2>
            
            <div className="h-80 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="year" 
                    label={{ value: 'Years', position: 'insideBottomRight', offset: -10 }} 
                  />
                  <YAxis 
                    tickFormatter={(value) => `₹${value.toLocaleString()}`}
                    label={{ value: 'Value (₹)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(value), 'Value']}
                    labelFormatter={(value) => `Year ${value}`}
                  />
                  <Legend />
                  
                  {selectedTypes.map(typeId => {
                    const type = investmentTypes.find(t => t.id === typeId);
                    return (
                      <React.Fragment key={typeId}>
                        <Line
                          type="monotone"
                          dataKey={`${typeId}Balance`}
                          name={`${type ? type.name : 'Custom'} (Nominal)`}
                          stroke={type ? type.color : '#8884d8'}
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey={`${typeId}InflationAdjusted`}
                          name={`${type ? type.name : 'Custom'} (Inflation Adjusted)`}
                          stroke={type ? type.color : '#8884d8'}
                          strokeDasharray="5 5"
                          strokeWidth={2}
                        />
                      </React.Fragment>
                    );
                  })}
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Final Balance (Nominal)</p>
                <p className="text-2xl font-bold text-blue-600">{formatCurrency(getFinalBalance())}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">Inflation-Adjusted Value</p>
                <p className="text-2xl font-bold text-green-600">{formatCurrency(getInflationAdjustedBalance())}</p>
              </div>
            </div>
          </div>
          
          {/* Retirement Goal Calculator */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Retirement Goal Calculator</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Retirement Goal Amount
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                  ₹
                  </span>
                  <input
                    type="number"
                    value={retirementGoal}
                    onChange={(e) => setRetirementGoal(Number(e.target.value))}
                    className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="bg-indigo-50 p-4 rounded-lg w-full">
                  <p className="text-sm text-gray-600 mb-1">Years to Reach Goal</p>
                  <p className="text-2xl font-bold text-indigo-600">{calculateYearsToGoal()} years</p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-yellow-50 rounded-md">
              <h3 className="font-medium text-yellow-800 mb-2">Retirement Planning Tips</h3>
              <ul className="list-disc pl-5 text-sm text-yellow-800 space-y-1">
                <li>Start investing early to take advantage of compound interest</li>
                <li>Increase your contributions over time as your income grows</li>
                <li>Diversify your investments to manage risk</li>
                <li>Consider tax-advantaged retirement accounts like 401(k) or IRA</li>
                <li>Adjust your investment strategy as you get closer to retirement</li>
              </ul>
            </div>
          </div>
          
          {/* Compound Interest Explanation */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">The Power of Compound Interest</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-800 mb-2">How It Works</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Compound interest is the addition of interest to the principal sum of a loan or deposit, or in other words, interest on interest. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is earned on the principal sum plus previously accumulated interest.
                </p>
                <p className="text-gray-600 text-sm">
                  This effect can be dramatic over long periods of time, which is why starting to invest early is so important for building wealth.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-800 mb-2">Example</h3>
                <p className="text-gray-600 text-sm mb-4">
                  If you invest ₹10,000 at a 7% annual return:
                </p>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>After 10 years: ~₹19,672</li>
                  <li>After 20 years: ~₹38,697</li>
                  <li>After 30 years: ~₹76,123</li>
                  <li>After 40 years: ~₹149,745</li>
                </ul>
                <p className="text-gray-600 text-sm mt-4">
                  Adding just ₹500 per month dramatically increases these figures!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentCalculator;