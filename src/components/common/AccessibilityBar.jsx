import React, { useState } from 'react';
import { useAccessibility } from '../../context/AccessibilityContext';

const AccessibilityBar = () => {
  const {
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    toggleHighContrast,
    isHighContrast,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="fixed z-50"
      style={{ right: '32px', bottom: '128px', cursor: 'pointer' }}
    >
        <div className="relative">
            <div onClick={handleClick} className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-3xl">accessibility</span>
            </div>
            {isOpen && (
                <div className="absolute bottom-0 right-full mr-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg w-64 space-y-2">
                    <h3 className="font-bold text-center">Accesibilidad</h3>
                    <div>
                        <span className="text-sm">Tamaño de Fuente</span>
                        <div className="flex space-x-2 mt-1">
                            <button onClick={decreaseFontSize} className="border px-2 py-1 rounded w-full text-sm">-A</button>
                            <button onClick={increaseFontSize} className="border px-2 py-1 rounded w-full text-sm">+A</button>
                            <button onClick={resetFontSize} className="border px-2 py-1 rounded w-full text-sm">Reset</button>
                        </div>
                    </div>
                    <div>
                        <span className="text-sm">Contraste</span>
                        <button onClick={toggleHighContrast} className={`border px-2 py-1 rounded w-full mt-1 text-sm ${isHighContrast ? 'bg-white text-black' : ''}`}>
                            {isHighContrast ? 'Desactivar' : 'Activar'} Alto Contraste
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
};

export default AccessibilityBar;