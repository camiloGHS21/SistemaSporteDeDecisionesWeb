import React from 'react';

const ReportsSection = ({ reports }) => {
  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-text-light mb-6">Informes de usuarios</h2>
      <div className="bg-card-light p-6 rounded-xl shadow-sm mb-8">
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light">search</span>
          <input className="w-full pl-10 pr-4 py-2 border border-border-light rounded-lg bg-background-light text-text-light focus:ring-primary focus:border-primary" placeholder="Buscar informes" type="text" />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-card-light rounded-xl p-6 shadow-sm border border-border-light">
            <h3 className="font-semibold text-text-light">{report.title}</h3>
            <p className="text-sm text-subtext-light mt-2">Usuario: {report.user}</p>
            <p className="text-sm text-subtext-light">Fecha: {report.date}</p>
            <button className="mt-4 text-sm font-medium text-primary hover:underline">Ver informe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsSection;
