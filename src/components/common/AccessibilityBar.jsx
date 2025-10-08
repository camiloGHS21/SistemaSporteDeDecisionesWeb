import React, { useState, useRef, useEffect } from 'react';
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
  const [position, setPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 220 });
  
  const dragRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    didDrag: false,
  });
  const nodeRef = useRef(null);

  const handleMouseDown = (e) => {
    dragRef.current.isDragging = true;
    dragRef.current.startX = e.clientX;
    dragRef.current.startY = e.clientY;
    dragRef.current.didDrag = false;
    if (nodeRef.current) {
        nodeRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (dragRef.current.isDragging) {
      const dx = e.clientX - dragRef.current.startX;
      const dy = e.clientY - dragRef.current.startY;
      if (dragRef.current.didDrag || Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        dragRef.current.didDrag = true;
        setPosition(prev => ({ x: prev.x + dx, y: prev.y + dy }));
      }
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
    }
  };

  const handleMouseUp = () => {
    dragRef.current.isDragging = false;
    if (nodeRef.current) {
        nodeRef.current.style.cursor = 'grab';
    }
  };

  const handleClick = () => {
    if (!dragRef.current.didDrag) {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    const onMouseMove = (e) => handleMouseMove(e);
    const onMouseUp = () => handleMouseUp();

    if (dragRef.current.isDragging) {
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    } else {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragRef.current.isDragging]);

  return (
    <div
      ref={nodeRef}
      className="fixed z-50"
      style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: 'grab' }}
      onMouseDown={handleMouseDown}
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
