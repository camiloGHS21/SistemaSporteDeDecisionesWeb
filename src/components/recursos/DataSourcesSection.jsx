import React from 'react';

const DataSourcesSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4 border-b border-border-light dark:border-border-dark pb-2">
        1. Fuentes de Datos Externas
      </h2>
      <p className="text-subtext-light dark:text-subtext-dark mb-6">
        El sistema se conecta a APIs externas para obtener datos actualizados. La fuente principal es:
      </p>
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-2">
          Banco Mundial
        </h3>
        <p className="text-subtext-light dark:text-subtext-dark mb-4">
          Utilizamos la API del Banco Mundial para acceder a una amplia gama de indicadores de desarrollo de países de todo el mundo. Esto nos permite proporcionar comparaciones detalladas y actualizadas.
        </p>
        <a 
          className="text-primary hover:underline flex items-center" 
          href="https://api.worldbank.org/v2/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Explorar API del Banco Mundial
          <span className="material-icons ml-1 text-sm">open_in_new</span>
        </a>
      </div>
    </div>
  );
};

export default DataSourcesSection;