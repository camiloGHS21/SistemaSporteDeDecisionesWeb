import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data as mockData } from '../../data'; // We still need mockData for the original indicators

const CompararChart = ({ data }) => {

  if (!data || !data.country || data.references.length === 0 || data.indicators.length === 0) {
    return (
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-6 p-4 rounded-lg bg-white border border-gray-200 h-[360px]">
          <p className="text-lg text-gray-500">Seleccione países e indicadores para ver los gráficos.</p>
        </div>
      </div>
    );
  }

  const allCountries = [data.country, ...data.references];

  const barChartData = allCountries.map(country => {
    const total = data.indicators.reduce((acc, selectedIndicator) => {
      let value = 0;
      // If it's our special API indicator, use the apiData
      if (selectedIndicator.value === 'api_indicator') {
        // This block will only run if data was successfully fetched from the API
        if (data.apiData) {
            const countryApiData = data.apiData[country.value];
            if (countryApiData && countryApiData.length > 0) {
                // We calculate the average of all values returned by the API for this country
                const apiTotal = countryApiData.reduce((apiAcc, apiItem) => apiAcc + (parseFloat(apiItem.dataValue) || 0), 0);
                value = apiTotal / countryApiData.length;
            }
        }
      } else {
        // Otherwise, fall back to the original mockData
        const countryMockData = mockData[country.value];
        if (countryMockData) {
          value = countryMockData[selectedIndicator.value] || 0;
        }
      }
      return acc + value;
    }, 0);

    const average = data.indicators.length > 0 ? total / data.indicators.length : 0;

    return {
      name: country.label,
      Rendimiento: average,
    };
  });

  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
          <p className="self-stretch flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-gray-800">
            Rendimiento General de la Política Digital
          </p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Rendimiento" fill="#1173d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompararChart;