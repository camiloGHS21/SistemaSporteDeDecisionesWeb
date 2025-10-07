---
sidebar_label: 'CompararChart'
---

# Componente CompararChart

## Descripción

`CompararChart` es un componente de React encargado de visualizar los datos de comparación en un gráfico de barras. Utiliza la librería `recharts` para renderizar un gráfico dinámico y responsivo. Muestra diferentes estados: un esqueleto de carga (`skeleton`), un mensaje para seleccionar datos, o el gráfico de barras con los datos de la comparación.

## Vista Previa

![Vista Previa de CompararChart](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Props

- `data` (Object): Un objeto que contiene todos los datos necesarios para construir el gráfico. Incluye `country`, `references`, `indicators` y `apiData`.
- `isGenerating` (Boolean): Un booleano que, si es `true`, muestra una animación de carga en lugar del gráfico o el mensaje de inicio.

## Funcionalidades

- **Estados de Visualización**:
  1.  **Cargando (`isGenerating: true`)**: Muestra una animación de esqueleto (placeholder) para indicar que los datos se están procesando.
  2.  **Inicial o Sin Datos**: Si no hay datos (`data` es nulo o no hay indicadores), muestra un mensaje pidiendo al usuario que haga selecciones.
  3.  **Gráfico Renderizado**: Cuando hay datos disponibles, muestra el gráfico de barras.

- **Procesamiento de Datos**: Antes de renderizar el gráfico, el componente procesa el objeto `data` para transformarlo en el formato que `recharts` espera (`barChartData`).
  - Maneja diferentes tipos de datos (`oecd` vs. datos primarios).
  - Asigna colores a las barras de los diferentes indicadores.

- **Formato de Ejes**: Formatea los números del eje Y para que sean más legibles, usando abreviaturas como K (miles), M (millones), B (billones) y T (trillones).

- **Título Dinámico**: El título del gráfico cambia según la cantidad de indicadores seleccionados para ser más descriptivo.

- **Interactividad**: El gráfico incluye `Tooltip` para ver detalles al pasar el ratón y una `Legend` para identificar los indicadores.

## Dependencias

- **React**: Para la lógica condicional y la renderización del componente.
- **recharts**: Una librería de gráficos de React utilizada para crear el `BarChart`. Se importan varios de sus componentes como `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`, etc.

## Código Fuente

```jsx
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const CompararChart = ({ data, isGenerating }) => {

  if (isGenerating) {
    return (
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-8">
        <div className="flex flex-col justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-6 p-4 rounded-lg bg-white border border-gray-200 h-[360px]">
          <div className="animate-pulse w-full h-full flex flex-col justify-center items-center">
            <div className="w-3/4 h-8 bg-slate-200 rounded mb-4"></div>
            <div className="w-full h-64 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

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
```