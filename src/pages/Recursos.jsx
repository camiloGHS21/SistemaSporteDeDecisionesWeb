import React from 'react';
import Header from '../components/common/Header';
import DataSourcesSection from '../components/recursos/DataSourcesSection';
import FileUploadSection from '../components/recursos/FileUploadSection';

const Recursos = () => {
  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-text-light dark:text-text-dark mb-4">
            Recursos y Fuentes de Datos
          </h1>
          <p className="text-lg text-subtext-light dark:text-subtext-dark mb-8">
            Esta sección proporciona información sobre las fuentes de datos utilizadas en el sistema y las instrucciones para la carga de archivos.
          </p>
          <div className="space-y-12">
            <DataSourcesSection />
            <FileUploadSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Recursos;