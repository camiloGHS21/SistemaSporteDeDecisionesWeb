import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompararChart = ({ data }) => {

  if (!data || !data.country || data.indicators.length === 0) {
    return (
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-6 p-4 rounded-lg bg-white border border-gray-200 h-[360px]">
          <p className="text-lg text-gray-500">Seleccione un país y al menos un indicador para ver los gráficos.</p>
        </div>
      </div>
    );
  }

  const allCountries = [data.country, ...data.references].filter(Boolean);
  const colors = ['#1173d4', '#ff8042', '#ffbb28', '#00C49F', '#FF8042', '#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const barChartData = allCountries.map(country => {
    const chartItem = { name: country.label };
    const countryApiData = data.apiData[country.value];

    if (data.dataType === 'oecd') {
      let value = null;
      if (countryApiData && countryApiData.length > 0) {
        // Average all dataValue properties from the OECD response
        const total = countryApiData.reduce((acc, item) => acc + parseFloat(item.dataValue || 0), 0);
        value = total / countryApiData.length;
      }
      // The label for the bar is the indicator's label (e.g., "PIB (OCDE)")
      if (data.indicators[0]) {
        chartItem[data.indicators[0].label] = value;
      }
    } else {
      // Handle primary data type
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
            <YAxis tickFormatter={(value) => {
                if (value >= 1000000000000) {
                    return `${(value / 1000000000000).toFixed(1)}T`;
                }
                if (value >= 1000000000) {
                    return `${(value / 1000000000).toFixed(1)}B`;
                }
                if (value >= 1000000) {
                    return `${(value / 1000000).toFixed(1)}M`;
                }
                if (value >= 1000) {
                    return `${(value / 1000).toFixed(1)}K`;
                }
                return value;
            }} />
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