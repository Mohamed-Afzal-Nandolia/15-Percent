// import React, { useState, useEffect } from 'react';
// import './App.css';
// import axios from 'axios';

// const TAX_RATE = 0.0825; // Houston tax rate
// const DISCOUNT_RATE = 0.15;

// const iphonePrices = {
//   'iPhone 16': 1099,
//   'iPhone 16 Pro': 1199,
//   'iPhone 16 Pro Max': 1299,
//   'iPhone 15': 999,
//   'iPhone 14': 899,
//   'iPhone SE': 499,
// };

// function App() {
//   const [selectedModel, setSelectedModel] = useState('');
//   const [finalPriceUSD, setFinalPriceUSD] = useState(0);
//   const [finalPriceINR, setFinalPriceINR] = useState(0);
//   const [exchangeRate, setExchangeRate] = useState(0);

//   // Fetch the USD to INR exchange rate on load
//   useEffect(() => {
//     axios.get(`https://v6.exchangerate-api.com/v6/YOUR_API_KEY/latest/USD`)
//       .then(response => {
//         setExchangeRate(response.data.conversion_rates.INR);
//       })
//       .catch(error => {
//         console.error('Error fetching exchange rate:', error);
//       });
//   }, []);

//   const calculateFinalPrice = (model) => {
//     if (!iphonePrices[model]) return;

//     const basePrice = iphonePrices[model];
//     const priceWithTax = basePrice + basePrice * TAX_RATE;
//     const discountedPrice = priceWithTax * (1 - DISCOUNT_RATE);

//     setFinalPriceUSD(discountedPrice);
//     setFinalPriceINR(discountedPrice * exchangeRate);
//   };

//   const handleModelChange = (e) => {
//     const model = e.target.value;
//     setSelectedModel(model);
//     calculateFinalPrice(model);
//   };

//   return (
//     <div className="App">
//       <center>
//       <h1>iPhone Discounted Prices</h1>
//       <label>Select an iPhone model:</label>
//       <select value={selectedModel} onChange={handleModelChange}>
//         <option value="">Select</option>
//         {Object.keys(iphonePrices).map((model) => (
//           <option key={model} value={model}>{model}</option>
//         ))}
        
//       </select>

//       {finalPriceUSD > 0 && (
//         <div>
//           <p>Final Price in USD: ${finalPriceUSD.toFixed(2)}</p>
//           <p>Final Price in INR: ₹{finalPriceINR.toFixed(2)}</p>
//         </div>
//       )}
//       </center>
//     </div>
//   );
// }

// export default App;
