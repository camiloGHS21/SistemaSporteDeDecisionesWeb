import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import InformeForm from '../components/informes/InformeForm';
import InformePreview from '../components/informes/InformePreview';
import { getCountries, generateReport, getIndicatorNames } from '../api/data.js';

const Informes = () => {
  const [countries, setCountries] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [principalCountry, setPrincipalCountry] = useState('');
  const [comparisonCountries, setComparisonCountries] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState([]);
  const [format, setFormat] = useState('pdf');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const [countriesData, indicatorsData] = await Promise.all([
          getCountries(),
          getIndicatorNames(),
        ]);

        setCountries(countriesData.map(country => ({ label: country.nombre_pais, value: country.nombre_pais })));
        setIndicators(indicatorsData.map(indicator => ({ label: indicator, value: indicator })));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleGenerateReport = async () => {
    const reportData = {
      reportName: "Mi Reporte de Políticas Digitales",
      paisPrincipal: principalCountry,
      paises: comparisonCountries,
      indicadores: selectedIndicators,
      reportType: format.toUpperCase(),
    };

    try {
      const blob = await generateReport(reportData);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `report.${format}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <div className="flex h-screen w-full flex-col bg-gray-50">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto max-w-6xl px-4 py-6">
          <div className="mb-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Generador de Informes</h2>
            <p className="mt-2 text-md text-blue-600">
              Crea informes comparando políticas digitales entre naciones.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <InformeForm 
                countries={countries} 
                indicators={indicators}
                principalCountry={principalCountry}
                setPrincipalCountry={setPrincipalCountry}
                comparisonCountries={comparisonCountries}
                setComparisonCountries={setComparisonCountries}
                selectedIndicators={selectedIndicators}
                setSelectedIndicators={setSelectedIndicators}
                format={format}
                setFormat={setFormat}
              />
            </div>
            <div className="lg:col-span-2 flex flex-col">
              <InformePreview />
              <div className="mt-4 flex justify-end">
                <button 
                    onClick={handleGenerateReport}
                    className="flex items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3 text-base font-bold text-white shadow-sm hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                >
                    <span className="material-symbols-outlined"> download </span>
                    <span>Generar y Descargar Informe</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Informes;
