import React, { useState, useRef, useEffect } from 'react';

const AsistenteAnalisis = ({ data, messages, setMessages }) => {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: window.innerHeight - 650 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage = { sender: 'user', text: inputValue };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);

    const greetings = ['hola', 'buenos días', 'buenas tardes', 'buenas noches', 'hey', 'qué tal'];
    if (greetings.includes(inputValue.toLowerCase().trim())) {
      const botMessage = {
        sender: 'bot',
        text: '¡Hola! Soy Analyst, tu asistente de análisis. ¿En qué puedo ayudarte hoy?',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      setIsLoading(false);
      return;
    }

    if (!data || !data.country || data.indicators.length === 0) {
      setTimeout(() => {
        const botMessage = {
          sender: 'bot',
          text: 'Por favor, primero selecciona un país y al menos un indicador para analizar.',
        };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
        setIsLoading(false);
      }, 1000);
      return;
    }

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        const errorMessage = {
            sender: 'bot',
            text: 'Error: La clave de API de Gemini no está configurada. Asegúrate de que el archivo .env es correcto y reinicia el servidor.',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
        setIsLoading(false);
        return;
    }

    const allCountries = [data.country, ...data.references].filter(Boolean);
    
    const barChartData = allCountries.map(country => {
      const chartItem = { name: country.label };
      const countryApiData = data.apiData[country.value];
  
      if (data.dataType === 'oecd') {
        let value = null;
        if (countryApiData && countryApiData.length > 0) {
          const total = countryApiData.reduce((acc, item) => acc + parseFloat(item.dataValue || 0), 0);
          value = total / countryApiData.length;
        }
        if (data.indicators[0]) {
          chartItem[data.indicators[0].label] = value;
        }
      } else {
        data.indicators.forEach(selectedIndicator => {
          let value = null;
          if (countryApiData) {
            const indicatorData = countryApiData.find(d => d.tipoIndicador === selectedIndicator.value);
            if (indicatorData) {
              value = indicatorData.valor;
            }
          }
          chartItem[selectedIndicator.label] = value;
        });
      }
      return chartItem;
    });

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `Eres Analyst, un asistente de análisis de datos con acceso a información contextual. Tu objetivo es responder a las preguntas del usuario de manera informativa y conversacional.

Contexto:
- País principal: ${data.country.label}
- Países de referencia: ${data.references.map(r => r.label).join(', ')}
- Indicadores seleccionados: ${data.indicators.map(i => i.label).join(', ')}
- Datos del gráfico (si es relevante para la pregunta): ${JSON.stringify(barChartData, null, 2)}

Pregunta del usuario: "${inputValue}"

Instrucciones:
1.  Si la pregunta es general (p. ej., "¿por qué los indicadores de un país son bajos?"), responde basándote en tu conocimiento general y, si es posible, relaciona la respuesta con los datos proporcionados.
2.  Si la pregunta es específica sobre los datos del gráfico, analiza los datos y proporciona una respuesta detallada.
3.  Sé siempre amable y servicial.`;

    const requestBody = {
        contents: [{
            parts: [{
                text: prompt
            }]
        }]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error de API:", errorData);
            throw new Error(`Error en la petición: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        const text = responseData.candidates[0].content.parts[0].text;

        const botMessage = { sender: 'bot', text };
        setMessages((prevMessages) => [...prevMessages, botMessage]);

    } catch (error) {
        console.error("Error al contactar la API de Gemini:", error);
        const errorMessage = {
            sender: 'bot',
            text: 'Lo siento, no pude obtener una respuesta. Verifica la consola del navegador para más detalles.',
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setIsLoading(false);
  };

  return (
    <div
      className="flex flex-col justify-start items-start w-96 h-[544px] overflow-hidden rounded-lg bg-white fixed z-20"
      style={{
        boxShadow: "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? 'grabbing' : 'default',
      }}
    >
      <div
        className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0 px-4 pt-4 pb-[17px] border-t-0 border-r-0 border-b border-l-0 border-gray-200"
        onMouseDown={handleMouseDown}
        style={{ cursor: 'grab' }}
      >
        <div className="flex justify-start items-center flex-grow-0 flex-shrink-0 relative">
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative pr-2">
            <p className="flex-grow-0 flex-shrink-0 text-2xl text-left text-[#007bff]"><span className="material-icons">smart_toy</span></p>
          </div>
          <p className="flex-grow-0 flex-shrink-0 text-lg font-semibold text-left text-[#1a202c]">
            Asistente de Análisis
          </p>
        </div>
      </div>
      <div ref={chatContainerRef} className="flex flex-col justify-start items-start self-stretch flex-grow overflow-auto gap-4 p-4">
        {messages.map((message, index) => {
          if (message.sender === 'bot') {
            return (
              <div key={index} className="flex justify-start items-start self-stretch">
                <div className="flex justify-center items-center flex-shrink-0 w-8 h-8 rounded-full bg-[#007bff]">
                  <div className="flex flex-col justify-start items-start relative">
                    <p className="text-lg text-left text-white"><span className="material-icons">smart_toy</span></p>
                  </div>
                </div>
                <div className="flex flex-col justify-start items-start pl-3">
                  <div className="relative p-3 rounded-lg bg-gray-100 max-w-[280px]">
                    <p className="text-sm text-left text-gray-800 break-words">
                      {message.text.split('\n').map((line, i, arr) => (
                        <React.Fragment key={i}>
                          {line}
                          {i < arr.length - 1 && <br />}
                        </React.Fragment>
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            );
          } else { // sender === 'user'
            return (
              <div key={index} className="flex justify-end items-start self-stretch">
                <div className="flex flex-col justify-start items-start pr-3">
                  <div className="relative p-3 rounded-lg bg-[#007bff]/20">
                    <p className="text-sm text-left text-[#1a202c]">
                      {message.text}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center items-center flex-shrink-0 w-8 h-8 rounded-full bg-gray-300">
                  <div className="flex flex-col justify-start items-start relative">
                    <p className="text-lg text-left text-gray-600"><span className="material-icons">person</span></p>
                  </div>
                </div>
              </div>
            );
          }
        })}
        {isLoading && (
            <div className="flex justify-start items-start self-stretch">
                <div className="flex justify-center items-center flex-shrink-0 w-8 h-8 rounded-full bg-[#007bff]">
                    <div className="flex flex-col justify-start items-start relative">
                        <p className="text-lg text-left text-white"><span className="material-icons">smart_toy</span></p>
                    </div>
                </div>
                <div className="flex flex-col justify-start items-start pl-3">
                    <div className="relative p-3 rounded-lg bg-gray-100 max-w-[280px]">
                        <p className="text-sm text-left text-gray-800">
                            ...escribiendo
                        </p>
                    </div>
                </div>
            </div>
        )}
      </div>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 px-4 pt-[17px] pb-4 border-t border-r-0 border-b-0 border-l-0 border-gray-200">
        <div className="flex justify-start items-center self-stretch flex-grow-0 flex-shrink-0">
          <div className="flex flex-col justify-start items-start flex-grow overflow-hidden px-[17px] pt-[11px] pb-3 rounded-full bg-gray-100 border border-gray-300">
            <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative overflow-hidden">
              <input
                type="text"
                placeholder="Escribe tu pregunta..."
                className="self-stretch flex-grow-0 flex-shrink-0 w-[266px] text-base text-left text-gray-800 bg-transparent border-none focus:outline-none placeholder-gray-500"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
            </div>
          </div>
          <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 pl-3">
            <div onClick={handleSendMessage} className={`flex flex-col justify-center items-center flex-grow-0 flex-shrink-0 p-2 rounded-full bg-[#007bff] ${isLoading ? 'opacity-50' : 'cursor-pointer'}`}>
              <div className="flex justify-center items-start flex-grow-0 flex-shrink-0 relative">
                <p className="flex-grow-0 flex-shrink-0 text-2xl text-center text-white"><span className="material-icons">send</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AsistenteAnalisis;