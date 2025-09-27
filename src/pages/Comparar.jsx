import React, { useState, useEffect } from 'react';
import CompararHeader from '../components/comparar/CompararHeader';
import CompararForm from '../components/comparar/CompararForm';
import CompararChart from '../components/comparar/CompararChart';
import AsistenteAnalisis from '../components/asistente/AsistenteAnalisis';

const Comparar = () => {
  const [comparisonData, setComparisonData] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu asistente de IA. Pregúntame\nsobre los datos en el gráfico.',
    },
  ]);

  const handleCompare = (data) => {
    setComparisonData(data);
  };

  const isChartDataAvailable = comparisonData && comparisonData.country && comparisonData.references.length > 0 && comparisonData.indicators.length > 0;

  useEffect(() => {
    if (!isChartDataAvailable && isChatOpen) {
      setIsChatOpen(false);
    }
  }, [isChartDataAvailable, isChatOpen]);

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen bg-[#f8f9fa]">
      <div className="w-full border-b border-gray-200">
        <CompararHeader />
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow pt-8 px-12">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2">
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
                <p className="self-stretch flex-grow-0 flex-shrink-0 text-4xl font-bold text-left text-gray-900">
                  Comparar el rendimiento de las políticas digitales
                </p>
              </div>
              <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
                <p className="self-stretch flex-grow-0 flex-shrink-0 text-lg text-left text-slate-500">
                  Seleccione países e indicadores para comenzar su análisis comparativo.
                </p>
              </div>
            </div>
            <div className="flex justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
              <div className="w-1/3">
                <CompararForm onCompare={handleCompare} />
              </div>
              <div className="w-2/3">
                <CompararChart data={comparisonData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => isChartDataAvailable && setIsChatOpen(!isChatOpen)}
        className={`fixed bottom-8 right-8 bg-[#007bff] text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 ${!isChartDataAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isChartDataAvailable}
      >
        <span className="material-icons text-3xl">chat</span>
      </button>
      {isChatOpen && isChartDataAvailable && <AsistenteAnalisis data={comparisonData} messages={messages} setMessages={setMessages} />} 
    </div>
  );
};

export default Comparar;