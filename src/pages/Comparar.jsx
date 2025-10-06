import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
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
  const navigate = useNavigate();
  const [indicators, setIndicators] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const fetchIndicators = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      try {
        const response = await fetch('/api/indicadores/pais/Colombia', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            const uniqueIndicators = [...new Set(data.map(item => item.tipoIndicador))];
            const formattedIndicators = uniqueIndicators.map(indicator => ({
              label: indicator,
              value: indicator,
            }));
            setIndicators(formattedIndicators);
            return; // Success, do not fall back
          }
        }

        // If primary API fails or returns no data, fall back to OECD
        setIndicators([{ label: "PIB (OCDE)", value: "gdp_oecd" }]);

      } catch (error) {
        console.error('Error fetching indicators, falling back to OECD:', error);
        setIndicators([{ label: "PIB (OCDE)", value: "gdp_oecd" }]);
      }
    };

    fetchIndicators();
  }, [navigate]);

  const handleCompare = async (data) => {
    setIsGenerating(true);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      setIsGenerating(false);
      return;
    }

    const countriesToFetch = [data.country, ...data.references].filter(Boolean);
    const isOecd = data.indicators.some(ind => ind.value === 'gdp_oecd');

    let fetchedData;
    try {
      if (isOecd) {
        const oecdPromises = countriesToFetch.map(country =>
          fetch(`/api/oecd-data/${country.value}/2024`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }).then(res => {
            if (!res.ok) return []; // Return empty array on error
            return res.json();
          })
        );
        fetchedData = await Promise.all(oecdPromises);
      } else {
        const primaryPromises = countriesToFetch.map(country =>
          fetch(`/api/indicadores/pais/${country.label}`, {
            headers: { 'Authorization': `Bearer ${token}` },
          }).then(res => {
            if (!res.ok) return []; // Return empty array on error
            return res.json();
          })
        );
        fetchedData = await Promise.all(primaryPromises);
      }

      const transformedData = {
        ...data,
        dataType: isOecd ? 'oecd' : 'primary',
        apiData: countriesToFetch.reduce((acc, country, index) => {
          acc[country.value] = fetchedData[index];
          return acc;
        }, {}),
      };

      setComparisonData(transformedData);

    } catch (error) {
      console.error('Error during data fetch:', error);
      // Handle auth errors inside the fetch logic if possible
    } finally {
      setIsGenerating(false);
    }
  };

  const isChartDataAvailable = comparisonData && comparisonData.country && comparisonData.indicators.length > 0;

  useEffect(() => {
    if (!isChartDataAvailable && isChatOpen) {
      setIsChatOpen(false);
    }
  }, [isChartDataAvailable, isChatOpen]);

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen bg-[#f8f9fa]">
      <div className="w-full border-b border-gray-200">
        <Header />
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
                <CompararForm onCompare={handleCompare} indicators={indicators} isGenerating={isGenerating} />
              </div>
              <div className="w-2/3">
                <CompararChart data={comparisonData} isGenerating={isGenerating} />
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