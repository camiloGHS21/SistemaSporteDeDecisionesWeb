import React, { createContext, useState, useContext } from 'react';

const ComparisonContext = createContext();

export const useComparison = () => useContext(ComparisonContext);

export const ComparisonProvider = ({ children }) => {
  const [comparedCountries, setComparedCountries] = useState([]);
  const [comparedIndicators, setComparedIndicators] = useState([]);

  const addComparison = (data) => {
    const countries = [data.country, ...data.references].filter(Boolean);
    const indicators = data.indicators;

    const newCountries = countries.map(c => ({ value: c.value, label: c.label }));
    const newIndicators = indicators.map(i => ({ value: i.value, label: i.label }));

    setComparedCountries(prev => [...new Set([...prev.map(c => c.value), ...newCountries.map(c => c.value)])].map(value => {
        const existing = prev.find(c => c.value === value);
        if (existing) return existing;
        return newCountries.find(c => c.value === value);
    }));

    setComparedIndicators(prev => [...new Set([...prev.map(i => i.value), ...newIndicators.map(i => i.value)])].map(value => {
        const existing = prev.find(i => i.value === value);
        if (existing) return existing;
        return newIndicators.find(i => i.value === value);
    }));
  };

  return (
    <ComparisonContext.Provider value={{ comparedCountries, comparedIndicators, addComparison }}>
      {children}
    </ComparisonContext.Provider>
  );
};
