import React, { useState } from 'react';
import { countries } from '../../data';

const CompararForm = ({ onCompare, indicators = [], isGenerating }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedReferenceCountries, setSelectedReferenceCountries] = useState([]);
  const [selectedIndicators, setSelectedIndicators] = useState([]);

  const handleCompare = () => {
    const country = countries.find(c => c.value === selectedCountry);
    const references = selectedReferenceCountries.map(value => countries.find(c => c.value === value));
    const inds = selectedIndicators.map(value => indicators.find(i => i.value === value));

    onCompare({
      country: country,
      references: references,
      indicators: inds,
    });
  };

  return (
    <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4 p-4 rounded-lg bg-white border border-gray-200">
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
          <p className="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-gray-800">
            Seleccionar países
          </p>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
            <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-slate-600">
              Su País
            </p>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="self-stretch flex-grow-0 flex-shrink-0 h-[42px] relative rounded-md bg-white border border-gray-300 pl-[13px] pr-[9px] text-base text-black"
            >
              <option value="" disabled>Seleccione su país</option>
              {countries.map(country => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
            <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-slate-600">
              Países de Referencia (hasta 5)
            </p>
            <select
              multiple
              value={selectedReferenceCountries}
              onChange={(e) => setSelectedReferenceCountries(Array.from(e.target.selectedOptions, option => option.value))}
              className="self-stretch flex-grow-0 flex-shrink-0 h-[80px] relative overflow-auto rounded-md bg-white border border-gray-300 p-2"
            >
              {countries.map(country => (
                <option key={country.value} value={country.value}>{country.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-4">
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative">
          <p className="self-stretch flex-grow-0 flex-shrink-0 text-lg font-bold text-left text-gray-800">
            Seleccionar indicadores de TIC
          </p>
        </div>
        <div className="flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 relative gap-1">
          <p className="flex-grow-0 flex-shrink-0 text-sm font-medium text-left text-slate-600">
            Indicadores
          </p>
          <select
            multiple
            value={selectedIndicators}
            onChange={(e) => setSelectedIndicators(Array.from(e.target.selectedOptions, option => option.value))}
            className="self-stretch flex-grow-0 flex-shrink-0 h-[80px] relative overflow-auto rounded-md bg-white border border-gray-300 p-2"
          >
            {indicators.map(indicator => (
              <option key={indicator.value} value={indicator.value}>{indicator.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button
        onClick={handleCompare}
        disabled={isGenerating}
        className="flex justify-center items-center self-stretch flex-grow-0 flex-shrink-0 gap-2 px-4 py-3 rounded-md bg-[#1173d4] disabled:opacity-50"
      >
        {isGenerating ? (
          <>
            <span className="material-symbols-outlined animate-spin">sync</span>
            <span>Comparando...</span>
          </>
        ) : (
          <>
            <div className="flex flex-col justify-start items-start flex-grow-0 flex-shrink-0 relative py-0.5">
              <svg
                width={17}
                height={20}
                viewBox="0 0 17 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex-grow-0 flex-shrink-0 w-4 h-5 relative"
                preserveAspectRatio="none"
              >
                <path
                  d="M5.49829 15.3333L4.56496 14.3833L6.28162 12.6666H1.49829V11.3333H6.28162L4.56496 9.61665L5.49829 8.66665L8.83162 12L5.49829 15.3333ZM10.8316 11.3333L7.49829 7.99998L10.8316 4.66665L11.765 5.61665L10.0483 7.33331H14.8316V8.66665H10.0483L11.765 10.3833L10.8316 11.3333Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="flex flex-col justify-start items-center flex-grow-0 flex-shrink-0 relative">
              <p className="flex-grow-0 flex-shrink-0 text-sm font-bold text-center text-white">
                Comparar
              </p>
            </div>
          </>
        )}
      </button>
    </div>
  );
};

export default CompararForm;