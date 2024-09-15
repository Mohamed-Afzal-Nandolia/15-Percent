import React, { useState } from 'react';
import axios from 'axios';
import './CurrencyConverter.css'; // Ensure to include CSS for styling

function CurrencyConverter() {
  const [model, setModel] = useState('');
  const [capacity, setCapacity] = useState('');
  const [taxLocation, setTaxLocation] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalPriceWithTax, setTotalPriceWithTax] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const iphoneModels = {
    "iPhone 16 Pro": { "128GB": 999, "256GB": 1099, "512GB": 1299, "1TB": 1499 },
    "iPhone 16 Pro Max": { "256GB": 1199, "512GB": 1399, "1TB": 1599 },
    "iPhone 16": { "128GB": 799, "256GB": 899, "512GB": 1099 },
    "iPhone 16 Plus": { "128GB": 899, "256GB": 999, "512GB": 1199 },
    "iPhone 15": { "128GB": 699, "256GB": 799, "512GB": 999 },
    "iPhone 15 Plus": { "128GB": 799, "256GB": 899, "512GB": 1099 },
    "iPhone 14": { "128GB": 599, "256GB": 699, "512GB": 899 },
    "iPhone 14 Plus": { "128GB": 699, "256GB": 799, "512GB": 999 },
    "iPhone SE": { "64GB": 429, "128GB": 479, "256GB": 579 }
  };

  const carrierCharges = {
    "iPhone 16": 30,
    "iPhone 16 Plus": 30,
    "iPhone 15": 30,
    "iPhone 15 Plus": 30,
    "iPhone 14": 30,
    "iPhone 14 Plus": 30
  };

  const taxRates = {
    "Houston": 0.0825,
    "California": 0.0925
  };

  const discount = 0.15;
  const modelPrice = iphoneModels[model]?.[capacity] || 0;
  const carrierCharge = carrierCharges[model] || 0;
  const calculateTotalPrice = async () => {
    try {
      // Get the base price for the selected model and capacity
      const modelPrice = iphoneModels[model]?.[capacity] || 0;
      // Add carrier charge if applicable
      const carrierCharge = carrierCharges[model] || 0;
      const priceBeforeDiscount = modelPrice + carrierCharge;
  
      // Calculate tax and discount
      const tax = priceBeforeDiscount * (taxRates[taxLocation] || 0);
      const totalPriceWithTaxValue = priceBeforeDiscount + tax;
      const discountAmountValue = totalPriceWithTaxValue * discount;
      const totalPriceWithDiscount = totalPriceWithTaxValue - discountAmountValue;
  
      console.log("Base Price:", modelPrice);
      console.log("Carrier Charge:", carrierCharge);
      console.log("Price before Discount:", priceBeforeDiscount);
      console.log("Tax Amount:", tax);
      console.log("Total Price with Tax:", totalPriceWithTaxValue);
      console.log("Discount Amount:", discountAmountValue);
      console.log("Total Price with Discount:", totalPriceWithDiscount);
  
      setTotalPrice(totalPriceWithDiscount);
      setTaxAmount(tax);
      setDiscountAmount(discountAmountValue);
      setTotalPriceWithTax(totalPriceWithTaxValue);
  
      // Make API call to get exchange rate
      const apiKey = '5659540bfa3ea8af2e4b31f4';
      const fromCurrency = 'USD';
      const toCurrency = 'INR';
      const apiEndpoint = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`;
      const response = await axios.get(apiEndpoint);
      const exchangeRate = response.data.conversion_rate;
  
      console.log("Exchange Rate:", exchangeRate);
  
      const inrPrice = totalPriceWithDiscount * exchangeRate;
      setFinalPrice(inrPrice);
  
    } catch (error) {
      console.error("Error calculating price:", error);
      setTotalPrice(0);
      setFinalPrice(0);
      setTaxAmount(0);
      setDiscountAmount(0);
      setTotalPriceWithTax(0);
    }
  };
  

  return (
    <div className="container">
      <h1>IPhone Selector</h1>
      <div className="form-group">
        <label htmlFor="model">Select iPhone Model</label>
        <select id="model" value={model} onChange={(e) => setModel(e.target.value)}>
          <option value="">Select Model</option>
          {Object.keys(iphoneModels).map((model) => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="capacity">Select Storage Capacity</label>
        <select id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} disabled={!model}>
          <option value="">Select Capacity</option>
          {iphoneModels[model] && Object.keys(iphoneModels[model]).map((capacity) => (
            <option key={capacity} value={capacity}>{capacity}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="taxLocation">Select Tax Location</label>
        <select id="taxLocation" value={taxLocation} onChange={(e) => setTaxLocation(e.target.value)}>
          <option value="">Select Location</option>
          {Object.keys(taxRates).map((taxLocation) => (
            <option key={taxLocation} value={taxLocation}>{taxLocation}</option>
          ))}
        </select>
      </div>
      <button onClick={calculateTotalPrice} disabled={!model || !capacity || !taxLocation}>Calculate Total Price</button>
      <p>Price before Discount: ${modelPrice+carrierCharge}</p>
      <p>Tax Amount: ${taxAmount.toFixed(3)}</p>
      <p>Total Price with Tax: ${totalPriceWithTax.toFixed(3)}</p>
      <p>Discount Amount: ${discountAmount.toFixed(3)}</p>
      <p>Total Price with Discount in Dollars: ${totalPrice.toFixed(3)}</p>
      <p id="bold">Final INR Price: ₹{finalPrice.toFixed(3)}</p>
    </div>
  );
}

export default CurrencyConverter;
