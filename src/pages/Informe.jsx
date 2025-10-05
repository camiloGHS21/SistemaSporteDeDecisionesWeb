import React, { useState, useEffect } from 'react';
import Header from '../components/common/Header';
import { Multiselect } from 'multiselect-react-dropdown';
import axios from 'axios';

// TODO: Move token to a more secure location, like context or a secure storage.
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJST0xFX1VTRVIiXSwic3ViIjoiY2FtaWxvZ2hzMUBnbWFpbC5jb20iLCJpYXQiOjE3NTk2MDUyNTEsImV4cCI6MTc1OTY5MTY1MX0.8CPAXPHRIXzAAB6rA8YFAWuw_KNSRrL1ontM6JNXvtQ';

const axiosInstance = axios.create({
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

const Informe = () => {
  const [paises, setPaises] = useState([]);
  const [indicadores, setIndicadores] = useState([]);
  const [selectedPaises, setSelectedPaises] = useState([]);
  const [selectedIndicadores, setSelectedIndicadores] = useState([]);
  const [reportName, setReportName] = useState('');
  const [reportType, setReportType] = useState('PDF');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paisesResponse = await axiosInstance.get('http://localhost:8080/api/paises');
        setPaises(paisesResponse.data.map(pais => ({ name: pais })));

        const indicadoresResponse = await axiosInstance.get('http://localhost:8080/api/indicadores/nombres');
        setIndicadores(indicadoresResponse.data.map(indicador => ({ name: indicador })));
      } catch (err) {
        setError('Error al cargar los datos iniciales. Asegúrate de que el backend esté funcionando.');
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    if (!reportName.trim()) {
      setError('Por favor, introduce un nombre para el informe.');
      return;
    }
    if (selectedPaises.length === 0) {
      setError('Por favor, selecciona al menos un país.');
      return;
    }
    if (selectedIndicadores.length === 0) {
      setError('Por favor, selecciona al menos un indicador.');
      return;
    }

    setError(null);
    setIsGenerating(true);

    const reportRequest = {
      reportName,
      paises: selectedPaises.map(p => p.name),
      indicadores: selectedIndicadores.map(i => i.name),
      reportType,
    };

    try {
      const response = await axiosInstance.post('http://localhost:8080/api/report', reportRequest, {
        responseType: 'blob', // Important for file downloads
      });

      const contentDisposition = response.headers['content-disposition'];
      let filename = reportName.replace(/ /g, '_') + '.' + reportType.toLowerCase(); // Default filename
      if (contentDisposition) {
          const filenameMatch = contentDisposition.match(/filename="?(.+)"?/);
          if (filenameMatch.length > 1) {
              filename = filenameMatch[1];
          }
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);

    } catch (err) {
      setError('Error al generar el informe. Inténtalo de nuevo.');
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div>
      <Header />
      <div style={{ padding: '2rem', background: '#f3f4f6', minHeight: 'calc(100vh - 64px)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#0d141b' }}>Generador de Informes Personalizados</h1>
            <p style={{ fontSize: '18px', color: '#1173d4' }}>
              Crea informes detallados comparando las políticas digitales de diferentes naciones.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
            {/* Columna de Configuración */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.05)' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0d141b', marginBottom: '1.5rem' }}>Configuración</h2>
              
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>Nombre del Informe</label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  placeholder="Mi Reporte de Políticas"
                  style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #d1d5db' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>Países</label>
                <Multiselect
                  options={paises}
                  selectedValues={selectedPaises}
                  onSelect={setSelectedPaises}
                  onRemove={setSelectedPaises}
                  displayValue="name"
                  style={{ searchBox: { border: '1px solid #d1d5db', borderRadius: '6px' } }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '4px' }}>Indicadores</label>
                <Multiselect
                  options={indicadores}
                  selectedValues={selectedIndicadores}
                  onSelect={setSelectedIndicadores}
                  onRemove={setSelectedIndicadores}
                  displayValue="name"
                  placeholder="Selecciona indicadores"
                  style={{ searchBox: { border: '1px solid #d1d5db', borderRadius: '6px' } }}
                />
              </div>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '14px', fontWeight: 500, color: '#374151', display: 'block', marginBottom: '8px' }}>Formato del Informe</label>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {['PDF', 'CSV'].map(type => (
                    <button
                      key={type}
                      onClick={() => setReportType(type)}
                      style={{
                        padding: '9px 17px',
                        borderRadius: '6px',
                        border: `1px solid ${reportType === type ? '#1173d4' : '#d1d5db'}`,
                        background: reportType === type ? '#1173d4' : '#fff',
                        color: reportType === type ? '#fff' : '#374151',
                        cursor: 'pointer',
                        fontWeight: 500,
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}

              <button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '6px',
                  background: '#1173d4',
                  color: '#fff',
                  border: 'none',
                  fontSize: '16px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  opacity: isGenerating ? 0.6 : 1,
                }}
              >
                {isGenerating ? 'Generando...' : 'Generar y Descargar Informe'}
              </button>
            </div>

            {/* Columna de Vista Previa */}
            <div style={{ background: '#fff', padding: '25px', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0px 1px 2px 0 rgba(0,0,0,0.05)' }}>
               <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#0d141b', marginBottom: '1rem' }}>Vista Previa del Informe</h2>
               <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '24px', minHeight: '300px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#0d141b' }}>
                  {reportName || 'Informe de Políticas Digitales'}
                </h3>
                <p style={{ fontSize: '16px', color: '#1173d4', marginBottom: '1.5rem' }}>
                  La vista previa del contenido del informe aparecerá aquí una vez generado.
                </p>
                <div>
                  <h4 style={{ fontWeight: 600, color: '#374151' }}>Países Seleccionados:</h4>
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                    {selectedPaises.length > 0 ? selectedPaises.map(p => <li key={p.name}>{p.name}</li>) : <li>Ninguno</li>}
                  </ul>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontWeight: 600, color: '#374151' }}>Indicadores Seleccionados:</h4>
                  <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
                    {selectedIndicadores.length > 0 ? selectedIndicadores.map(i => <li key={i.name}>{i.name}</li>) : <li>Ninguno</li>}
                  </ul>
                </div>
                 <div style={{ marginTop: '1rem' }}>
                  <h4 style={{ fontWeight: 600, color: '#374151' }}>Formato:</h4>
                  <p>{reportType}</p>
                </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informe;
