import { useState } from 'react';
import Aurora from "./blocks/Backgrounds/Aurora/Aurora.jsx";

// Updated fuel prices for Indian states (July 2025)
const FUEL_PRICES = {
  "Andhra Pradesh": { petrol: 109.83, diesel: 97.46 },
  "Arunachal Pradesh": { petrol: 92.53, diesel: 82.18 },
  "Assam": { petrol: 99.70, diesel: 90.91 },
  "Bihar": { petrol: 106.94, diesel: 93.14 },
  "Chhattisgarh": { petrol: 100.57, diesel: 94.51 },
  "Delhi": { petrol: 94.77, diesel: 87.67 },
  "Goa": { petrol: 95.20, diesel: 88.45 },
  "Gujarat": { petrol: 95.53, diesel: 91.00 },
  "Haryana": { petrol: 95.68, diesel: 88.25 },
  "Himachal Pradesh": { petrol: 97.85, diesel: 89.12 },
  "Jharkhand": { petrol: 104.23, diesel: 92.87 },
  "Karnataka": { petrol: 103.42, diesel: 91.48 },
  "Kerala": { petrol: 107.08, diesel: 95.71 },
  "Madhya Pradesh": { petrol: 106.97, diesel: 91.56 },
  "Maharashtra": { petrol: 105.43, diesel: 92.03 },
  "Manipur": { petrol: 98.65, diesel: 86.32 },
  "Meghalaya": { petrol: 102.14, diesel: 89.76 },
  "Mizoram": { petrol: 101.23, diesel: 88.54 },
  "Nagaland": { petrol: 99.87, diesel: 87.43 },
  "Odisha": { petrol: 102.09, diesel: 93.41 },
  "Punjab": { petrol: 97.90, diesel: 88.30 },
  "Rajasthan": { petrol: 105.67, diesel: 91.07 },
  "Sikkim": { petrol: 96.45, diesel: 85.21 },
  "Tamil Nadu": { petrol: 101.71, diesel: 93.55 },
  "Telangana": { petrol: 107.27, diesel: 95.33 },
  "Tripura": { petrol: 103.58, diesel: 91.22 },
  "Uttar Pradesh": { petrol: 95.55, diesel: 88.14 },
  "Uttarakhand": { petrol: 94.77, diesel: 89.54 },
  "West Bengal": { petrol: 106.33, diesel: 92.41 }
};

export default function App() {
  const [fuelType, setFuelType] = useState('petrol');
  const [distance, setDistance] = useState(22);
  const [mileage, setMileage] = useState(25);
  const [selectedState, setSelectedState] = useState('Delhi');
  const [isStateDropdownOpen, setIsStateDropdownOpen] = useState(false);
  const [useCustomPrice, setUseCustomPrice] = useState(false);
  const [customFuelPrice, setCustomFuelPrice] = useState('');
  const [costs, setCosts] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Get current fuel price based on selected state and fuel type, or custom price
  const getCurrentFuelPrice = () => {
    if (useCustomPrice && customFuelPrice) {
      return parseFloat(customFuelPrice);
    }
    return FUEL_PRICES[selectedState][fuelType];
  };

  const handleStateSelect = (state) => {
    setSelectedState(state);
    setIsStateDropdownOpen(false);
    setUseCustomPrice(false); // Reset custom price when state changes
    setCustomFuelPrice('');
  };

  const handleCustomPriceToggle = () => {
    setUseCustomPrice(!useCustomPrice);
    if (!useCustomPrice) {
      setCustomFuelPrice(FUEL_PRICES[selectedState][fuelType].toString());
    }
  };

  const calculateCosts = async () => {
    const currentPrice = getCurrentFuelPrice();
    if (!currentPrice || currentPrice <= 0) return;
    
    setIsCalculating(true);
    
    // Add a small delay for animation effect
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const fuelRequired = distance / mileage;
    const daily = fuelRequired * currentPrice;
    const monthly = daily * 30;
    const yearly = daily * 365;
    setCosts({
      daily: daily.toFixed(0),
      monthly: monthly.toFixed(0),
      yearly: yearly.toFixed(0),
    });
    
    setIsCalculating(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-inter overflow-hidden">
      {/* Aurora Background */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      
      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-3 sm:p-4 lg:p-6">
        
        {/* Glass Morphism Calculator Container with Entrance Animation */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 w-full max-w-xs sm:max-w-lg lg:max-w-3xl shadow-2xl animate-fade-in-up">
          
          {/* Header with Glow Animation */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-1 sm:mb-2 animate-pulse-glow">
              ⛽ Fuel Cost Calculator
            </h1>
            <p className="text-gray-300 text-xs sm:text-sm animate-fade-in-delay">
              Calculate your daily, monthly & yearly fuel expenses
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
            
            {/* Input Section */}
            <div className="space-y-3 sm:space-y-4">
              
              {/* Fuel Type Selection with Enhanced Animations */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-medium text-xs sm:text-sm">
                  Fuel Type
                </label>
                <div className="flex gap-1.5 sm:gap-2">
                  <button
                    className={`flex-1 px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-500 border-2 text-xs sm:text-sm cursor-pointer transform hover:scale-105 active:scale-95 ${
                      fuelType === 'petrol' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 animate-glow-blue' 
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/10'
                    }`}
                    onClick={() => setFuelType('petrol')}
                  >
                    <span className="inline-block animate-bounce-subtle">🚗</span> PETROL
                  </button>
                  <button
                    className={`flex-1 px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl font-medium transition-all duration-500 border-2 text-xs sm:text-sm cursor-pointer transform hover:scale-105 active:scale-95 ${
                      fuelType === 'diesel' 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-blue-400 shadow-lg shadow-blue-500/25 animate-glow-blue' 
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50 hover:shadow-lg hover:shadow-white/10'
                    }`}
                    onClick={() => setFuelType('diesel')}
                  >
                    <span className="inline-block animate-bounce-subtle">🚛</span> DIESEL
                  </button>
                </div>
              </div>

              {/* Distance Input with Focus Animation */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-medium text-xs sm:text-sm">
                  Daily Distance Travelled
                </label>
                <div className="flex rounded-lg sm:rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-500/25">
                  <input
                    type="number"
                    className="flex-1 px-2 py-2 sm:px-3 sm:py-2.5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-xs sm:text-sm transition-all duration-300"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="Distance"
                  />
                  <span className="bg-white/10 px-2 py-2 sm:px-3 sm:py-2.5 text-white font-medium text-xs sm:text-sm transition-all duration-300">
                    KM
                  </span>
                </div>
              </div>

              {/* Mileage Input with Focus Animation */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-medium text-xs sm:text-sm">
                  Vehicle Mileage
                </label>
                <div className="flex rounded-lg sm:rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-white/40 hover:bg-white/10 focus-within:border-blue-400 focus-within:shadow-lg focus-within:shadow-blue-500/25">
                  <input
                    type="number"
                    className="flex-1 px-2 py-2 sm:px-3 sm:py-2.5 bg-transparent text-white placeholder-gray-400 focus:outline-none text-xs sm:text-sm transition-all duration-300"
                    value={mileage}
                    onChange={(e) => setMileage(e.target.value)}
                    placeholder="Mileage"
                  />
                  <span className="bg-white/10 px-2 py-2 sm:px-3 sm:py-2.5 text-white font-medium text-xs sm:text-sm transition-all duration-300">
                    KM/L
                  </span>
                </div>
              </div>

              {/* State Selection with Enhanced Dropdown Animation */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-medium text-xs sm:text-sm">
                  Select State
                </label>
                <div className="relative">
                  <button
                    onClick={() => setIsStateDropdownOpen(!isStateDropdownOpen)}
                    className="w-full flex items-center justify-between px-2 py-2 sm:px-3 sm:py-2.5 rounded-lg sm:rounded-xl border-2 border-white/20 bg-white/5 backdrop-blur-sm text-white text-xs sm:text-sm cursor-pointer transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:shadow-lg hover:shadow-white/10 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="animate-pulse">📍</span> {selectedState}
                    </span>
                    <span className={`transform transition-all duration-300 ${isStateDropdownOpen ? 'rotate-180 text-blue-400' : 'hover:text-blue-300'}`}>
                      ▼
                    </span>
                  </button>
                  
                  {/* Enhanced Dropdown Menu with Slide Animation */}
                  {isStateDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-gray-900/95 backdrop-blur-xl border-2 border-white/40 rounded-lg sm:rounded-xl shadow-2xl max-h-48 overflow-y-auto z-30 animate-slide-down">
                      <div className="p-1">
                        {Object.keys(FUEL_PRICES).sort().map((state, index) => (
                          <button
                            key={state}
                            onClick={() => handleStateSelect(state)}
                            className={`w-full px-3 py-2 text-left text-xs sm:text-sm rounded-lg cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:translate-x-1 ${
                              selectedState === state 
                                ? 'bg-blue-500/30 text-blue-200 font-medium shadow-lg shadow-blue-500/20' 
                                : 'text-white hover:bg-white/20 hover:text-blue-200 hover:shadow-lg'
                            }`}
                            style={{ animationDelay: `${index * 20}ms` }}
                          >
                            {state}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Fuel Price Section with Enhanced Animations */}
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-white font-medium text-xs sm:text-sm">
                  Fuel Price
                </label>
                
                {/* Toggle between Auto and Custom Price with Morphing Animation */}
                <div className="flex gap-1.5 sm:gap-2 mb-2">
                  <button
                    className={`flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium transition-all duration-500 border text-xs cursor-pointer transform hover:scale-105 active:scale-95 ${
                      !useCustomPrice 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-400 shadow-lg shadow-green-500/25 animate-glow-green' 
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-green-400/50 hover:shadow-lg hover:shadow-green-500/10'
                    }`}
                    onClick={() => setUseCustomPrice(false)}
                  >
                    <span className="inline-block animate-bounce-subtle">🏛️</span> Current Price
                  </button>
                  <button
                    className={`flex-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg font-medium transition-all duration-500 border text-xs cursor-pointer transform hover:scale-105 active:scale-95 ${
                      useCustomPrice 
                        ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white border-orange-400 shadow-lg shadow-orange-500/25 animate-glow-orange' 
                        : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-orange-400/50 hover:shadow-lg hover:shadow-orange-500/10'
                    }`}
                    onClick={handleCustomPriceToggle}
                  >
                    <span className="inline-block animate-bounce-subtle">✏️</span> Set Custom Price
                  </button>
                </div>

                {/* Fuel Price Input/Display with Smooth Transition */}
                <div className="transition-all duration-500 transform">
                  {useCustomPrice ? (
                    <div className="flex rounded-lg sm:rounded-xl border-2 border-orange-400/50 bg-orange-500/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-orange-400 hover:bg-orange-500/20 focus-within:border-orange-400 focus-within:shadow-lg focus-within:shadow-orange-500/25 animate-fade-in-scale">
                      <input
                        type="number"
                        className="flex-1 px-2 py-2 sm:px-3 sm:py-2.5 bg-transparent text-white placeholder-orange-300 focus:outline-none text-xs sm:text-sm transition-all duration-300"
                        value={customFuelPrice}
                        onChange={(e) => setCustomFuelPrice(e.target.value)}
                        placeholder="Enter custom price"
                      />
                      <span className="bg-orange-500/20 px-2 py-2 sm:px-3 sm:py-2.5 text-orange-200 font-medium text-xs sm:text-sm transition-all duration-300">
                        ₹/L
                      </span>
                    </div>
                  ) : (
                    <div className="flex rounded-lg sm:rounded-xl border-2 border-green-400/50 bg-green-500/10 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-green-400 hover:bg-green-500/20 animate-fade-in-scale">
                      <div className="flex-1 px-2 py-2 sm:px-3 sm:py-2.5 text-green-200 text-xs sm:text-sm font-medium">
                        ₹{FUEL_PRICES[selectedState][fuelType]}
                      </div>
                      <span className="bg-green-500/20 px-2 py-2 sm:px-3 sm:py-2.5 text-green-200 font-medium text-xs sm:text-sm transition-all duration-300">
                        ₹/L
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Current Price Display with Pulse Animation */}
                <div className="mt-1 text-xs text-blue-300 animate-pulse-gentle">
                  💰 Current {fuelType} price: ₹{getCurrentFuelPrice()}/L
                  {useCustomPrice ? ' (Custom)' : ` (${selectedState})`}
                </div>
              </div>

              {/* Calculate Button with Advanced Animations */}
              <button
                className="w-full py-2.5 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-500 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 text-xs sm:text-sm cursor-pointer relative overflow-hidden group"
                onClick={calculateCosts}
                disabled={isCalculating}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isCalculating ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      <span className="animate-pulse">Calculating...</span>
                    </>
                  ) : (
                    <>
                      <span className="animate-bounce-subtle">🚀</span>
                      Calculate Fuel Cost
                    </>
                  )}
                </span>
              </button>
            </div>

            {/* Results Section with Staggered Animations */}
            <div className="bg-white/5 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-6 border-2 border-white/20 transition-all duration-300 hover:border-white/30 hover:bg-white/10">
              <h2 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-3 sm:mb-4 text-center animate-fade-in-delay">
                💰 Cost Breakdown
              </h2>
              
              <div className="space-y-2 sm:space-y-3">
                {/* Daily Cost with Slide Animation */}
                <div className={`flex justify-between items-center p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-green-500/10 transform hover:scale-[1.02] ${costs ? 'animate-slide-in-right' : ''}`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium text-xs sm:text-sm">Daily Cost</span>
                  </div>
                  <span className={`text-sm sm:text-lg font-bold text-green-400 transition-all duration-500 ${costs ? 'animate-number-pop' : ''}`}>
                    ₹{costs?.daily || '—'}
                  </span>
                </div>

                {/* Monthly Cost with Slide Animation */}
                <div className={`flex justify-between items-center p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-blue-500/10 transform hover:scale-[1.02]  ${costs ? 'animate-slide-in-right-delay' : ''}`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium text-xs sm:text-sm">Monthly Cost</span>
                  </div>
                  <span className={`text-sm sm:text-lg font-bold text-blue-400 transition-all duration-500 ${costs ? 'animate-number-pop-delay' : ''}`}>
                    ₹{costs?.monthly || '—'}
                  </span>
                </div>

                {/* Yearly Cost with Slide Animation */}
                <div className={`flex justify-between items-center p-2 sm:p-3 bg-white/5 rounded-lg sm:rounded-xl border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-lg hover:shadow-purple-500/10 transform hover:scale-[1.02] ${costs ? 'animate-slide-in-right-delay-2' : ''}`}>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-white font-medium text-xs sm:text-sm">Yearly Cost</span>
                  </div>
                  <span className={`text-sm sm:text-lg font-bold text-purple-400 transition-all duration-500 ${costs ? 'animate-number-pop-delay-2' : ''}`}>
                    ₹{costs?.yearly || '—'}
                  </span>
                </div>
              </div>

              {/* Additional Info with Fade Animation */}
              {costs && (
                <div className="mt-3 sm:mt-4 p-2 sm:p-3 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg sm:rounded-xl border border-white/10 animate-fade-in-scale-delay">
                  <div className="text-center">
                    <p className="text-gray-300 text-xs">
                      Based on {distance} km daily with {mileage} km/l mileage
                    </p>
                    <p className="text-gray-300 text-xs mt-0.5">
                      📍 {fuelType.charAt(0).toUpperCase() + fuelType.slice(1)} price: ₹{getCurrentFuelPrice()}/L
                      {useCustomPrice ? ' (Custom)' : ` (${selectedState})`}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Project Attribution with Hover Animation */}
        <div className="mt-4 sm:mt-6 text-center animate-fade-in-delay-2">
          <p className="text-gray-400 text-xs sm:text-sm">
            <a 
              href="https://yeshu.pages.dev" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-300 hover:text-blue-200 transition-all duration-300 cursor-pointer transform hover:scale-105 inline-block hover:shadow-lg hover:shadow-blue-500/20"
            >
              ~ A Project by Yeshu Wanjari
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
