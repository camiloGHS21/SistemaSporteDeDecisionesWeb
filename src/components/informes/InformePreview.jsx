import React from 'react';

const InformePreview = () => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold text-gray-900">Vista Previa del Informe</h3>
      <div className="overflow-hidden rounded-lg border border-slate-200">
        <div className="p-4">
          <h4 className="text-base font-bold text-gray-900">Informe de Políticas Digitales</h4>
          <p className="mt-1 text-sm text-blue-600">
           Vista previa del informe generado. Revisa los datos y el formato antes de descargar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InformePreview;
