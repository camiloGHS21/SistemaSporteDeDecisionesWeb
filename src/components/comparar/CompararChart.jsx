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
  const colors = ['#1173d4', '#ff8042', '#ffbb28', '#00C49F', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const barChartData = allCountries.map(country => {
    const chartItem = { name: country.label };

    data.indicators.forEach(selectedIndicator => {
      let value;
      if (selectedIndicator.value === 'api_indicator') {
        if (data.apiData) {
          const countryApiData = data.apiData[country.value];
          if (countryApiData && countryApiData.length > 0) {
            const validData = countryApiData.filter(item => item && item.dataValue != null);
            if (validData.length > 0) {
              const apiTotal = validData.reduce((apiAcc, apiItem) => apiAcc + (parseFloat(apiItem.dataValue) || 0), 0);
              value = apiTotal / validData.length;
            } else {
              value = null; // No valid data
            }
          } else {
            value = null; // No data array
          }
        } else {
          value = null; // No apiData object
        }
      } else {
        const countryMockData = mockData[country.value];
        if (countryMockData) {
          value = countryMockData[selectedIndicator.value] || 0;
        }
      }
      chartItem[selectedIndicator.label] = value;
    });

    return chartItem;
  });

  let chartTitle = "Rendimiento General de la Política Digital";
  if (data.indicators.length === 1) {
    chartTitle = data.indicators[0].label;
  } else if (data.indicators.length > 1) {
    chartTitle = "Comparación de Indicadores de Política Digital";
  }

  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-6 p-4 rounded-lg bg-white border border-gray-200">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
          <p className="self-stretch flex-grow-0 flex-shrink-0 text-xl font-bold text-left text-gray-800">
            {chartTitle}
          </p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barChartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {data.indicators.map((indicator, index) => (
              <Bar key={indicator.value} dataKey={indicator.label} fill={colors[index % colors.length]} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompararChart;