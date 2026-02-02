import { useState } from 'react';
import { DollarSign, TrendingDown } from 'lucide-react';
import Card from '../shared/Card';
import Button from '../shared/Button';

const EnergySavingsCalculator = () => {
  const [inputs, setInputs] = useState({
    currentBill: '',
    systemAge: '',
    homeSize: ''
  });
  const [results, setResults] = useState(null);

  const calculateSavings = (e) => {
    e.preventDefault();
    
    const bill = parseFloat(inputs.currentBill);
    const age = parseInt(inputs.systemAge);
    
    // Rough calculations based on efficiency improvements
    let efficiencyGain = 0;
    if (age > 15) efficiencyGain = 0.30; // 30% savings
    else if (age > 10) efficiencyGain = 0.20; // 20% savings
    else if (age > 5) efficiencyGain = 0.15; // 15% savings
    else efficiencyGain = 0.05; // 5% savings
    
    const monthlySavings = bill * efficiencyGain;
    const annualSavings = monthlySavings * 12;
    const fiveYearSavings = annualSavings * 5;
    
    setResults({
      monthly: monthlySavings.toFixed(2),
      annual: annualSavings.toFixed(2),
      fiveYear: fiveYearSavings.toFixed(2),
      percentage: (efficiencyGain * 100).toFixed(0)
    });
  };

  return (
    <Card className="bg-gradient-to-br from-green-50 to-blue-50">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <DollarSign className="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-secondary-900">
            Energy Savings Calculator
          </h3>
          <p className="text-sm text-secondary-600">
            See how much you could save with a new system
          </p>
        </div>
      </div>

      <form onSubmit={calculateSavings} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Current Monthly Energy Bill ($)
          </label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={inputs.currentBill}
            onChange={(e) => setInputs({ ...inputs, currentBill: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Current System Age (years)
          </label>
          <input
            type="number"
            required
            min="0"
            max="50"
            value={inputs.systemAge}
            onChange={(e) => setInputs({ ...inputs, systemAge: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="10"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            Home Size (sq ft)
          </label>
          <input
            type="number"
            required
            min="0"
            value={inputs.homeSize}
            onChange={(e) => setInputs({ ...inputs, homeSize: e.target.value })}
            className="w-full px-4 py-2 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
            placeholder="2000"
          />
        </div>

        <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white">
          Calculate Savings
        </Button>
      </form>

      {results && (
        <div className="mt-6 p-6 bg-white rounded-lg border-2 border-green-200">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingDown className="w-5 h-5 text-green-600" />
            <h4 className="font-bold text-secondary-900">
              Potential Savings with New High-Efficiency System
            </h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${results.monthly}
              </div>
              <div className="text-sm text-secondary-600">per month</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                ${results.annual}
              </div>
              <div className="text-sm text-secondary-600">per year</div>
            </div>
          </div>
          
          <div className="text-center p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
            <div className="text-3xl font-bold text-green-700 mb-1">
              ${results.fiveYear}
            </div>
            <div className="text-sm font-medium text-secondary-700">
              Total savings over 5 years
            </div>
            <div className="text-xs text-secondary-600 mt-1">
              Up to {results.percentage}% reduction in energy costs
            </div>
          </div>

          <p className="text-xs text-secondary-500 mt-4 text-center">
            *Estimates based on typical efficiency improvements. Actual savings may vary.
          </p>
        </div>
      )}
    </Card>
  );
};

export default EnergySavingsCalculator;
