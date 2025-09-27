import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { data as mockData } from '../../data';

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
    const countryData = mockData[country.value];
    const total = data.indicators.reduce((acc, indicator) => acc + countryData[indicator.value], 0);
    return {
      name: country.label,
      Rendimiento: total / data.indicators.length,
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