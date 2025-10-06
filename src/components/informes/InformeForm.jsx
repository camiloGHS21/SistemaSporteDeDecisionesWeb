import React from 'react';

const InformeForm = ({ 
  countries = [], 
  indicators = [],
  principalCountry,
  setPrincipalCountry,
  comparisonCountries,
  setComparisonCountries,
  selectedIndicators,
  setSelectedIndicators,
  format,
  setFormat,
}) => {

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Configuración</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="principal-country">País Principal</label>
          <select 
            value={principalCountry}
            onChange={(e) => setPrincipalCountry(e.target.value)}
            className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600"
          >
            <option value="" disabled>Selecciona un país</option>
            {countries.map(country => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="comparison-countries">Países a comparar</label>
          <select 
            multiple
            value={comparisonCountries}
            onChange={(e) => setComparisonCountries(Array.from(e.target.selectedOptions, option => option.value))}
            className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 h-20"
          >
            {countries.map(country => (
              <option key={country.value} value={country.value}>{country.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">Mantén pulsado Ctrl/Cmd para seleccionar varios.</p>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700" htmlFor="indicators">Indicadores</label>
          <select 
            multiple
            value={selectedIndicators}
            onChange={(e) => setSelectedIndicators(Array.from(e.target.selectedOptions, option => option.value))}
            className="mt-1 block w-full rounded-md border-slate-300 py-2 pl-3 pr-10 text-sm focus:border-blue-600 focus:outline-none focus:ring-blue-600 h-20"
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>{indicator.label}</option>
            ))}
          </select>
          <p className="mt-1 text-xs text-slate-500">Mantén pulsado Ctrl/Cmd para seleccionar varios.</p>
        </div>
        <div>
          <span className="block text-sm font-medium text-slate-700">Formato del Informe</span>
          <div className="mt-2 flex gap-4">
            <label className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium ${format === 'pdf' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-700'}`}>
              <input 
                checked={format === 'pdf'}
                onChange={() => setFormat('pdf')}
                className="sr-only" 
                name="format" 
                type="radio" 
                value="pdf" 
              />
              <span>PDF</span>
            </label>
            <label className={`flex cursor-pointer items-center justify-center rounded-md border px-3 py-1.5 text-sm font-medium ${format === 'csv' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300 text-slate-700'}`}>
              <input 
                checked={format === 'csv'}
                onChange={() => setFormat('csv')}
                className="sr-only" 
                name="format" 
                type="radio" 
                value="csv" 
              />
              <span>CSV</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InformeForm;
