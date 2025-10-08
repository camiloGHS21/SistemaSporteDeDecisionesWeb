import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => useContext(AccessibilityContext);

export const AccessibilityProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16); // Base font size
  const [isHighContrast, setIsHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSize}px`;
  }, [fontSize]);

  useEffect(() => {
    if (isHighContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [isHighContrast]);

  const increaseFontSize = () => setFontSize(prev => Math.min(prev + 2, 24));
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 2, 12));
  const resetFontSize = () => setFontSize(16);
  const toggleHighContrast = () => setIsHighContrast(prev => !prev);

  const value = {
    fontSize,
    isHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};
