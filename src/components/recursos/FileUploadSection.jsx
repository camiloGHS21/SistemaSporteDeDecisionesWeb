import React, { useState, useRef } from 'react';

const FileUploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        'text/csv',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ];
      const allowedExtensions = ['.csv', '.xls', '.xlsx'];
      
      const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
      
      if (allowedTypes.includes(file.type) || allowedExtensions.includes(fileExtension)) {
        setSelectedFile(file);
        setUploadStatus('');
      } else {
        setUploadStatus('Por favor, seleccione un archivo CSV o Excel (.csv, .xls, .xlsx)');
        setSelectedFile(null);
      }
    }
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      // Trigger file input click if no file selected
      fileInputRef.current?.click();
      return;
    }

    // TODO: Implement actual file upload to server
    setUploadStatus('Procesando archivo...');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus(`Archivo "${selectedFile.name}" cargado exitosamente`);
      console.log('File uploaded:', selectedFile);
      // Reset file selection after successful upload
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }, 2000);
  };

  const handleDownloadTemplate = () => {
    // Create CSV template with the required columns
    const csvHeaders = [
      'CodigoISO_Pais',
      'NombrePais', 
      'ID_indicador',
      'Nombre_Indicador',
      'Año',
      'Valor',
      'Unidad'
    ];
    
    // Add sample data rows
    const sampleData = [
      ['USA', 'Estados Unidos', 'GDP_001', 'PIB per cápita', '2023', '70000', 'Dólares'],
      ['COL', 'Colombia', 'GDP_001', 'PIB per cápita', '2023', '15000', 'Dólares'],
      ['ESP', 'España', 'INF_001', 'Tasa de inflación', '2023', '3.5', 'Porcentaje']
    ];
    
    // Create CSV content
    const csvContent = [
      csvHeaders.join(','),
      ...sampleData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'plantilla_datos_politicos.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setShowDownloadSuccess(true);
      setTimeout(() => setShowDownloadSuccess(false), 3000);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-text-light dark:text-text-dark mb-4 border-b border-border-light dark:border-border-dark pb-2">
        2. Carga de Datos Personalizados
      </h2>
      <p className="text-subtext-light dark:text-subtext-dark mb-6">
        El sistema permite a los usuarios cargar sus propios conjuntos de datos para análisis personalizados. Los archivos deben estar en formato CSV o Excel (.xlsx) y seguir una estructura específica para ser procesados correctamente.
      </p>
      <div className="bg-card-light dark:bg-card-dark p-6 rounded-lg border border-border-light dark:border-border-dark">
        <h3 className="text-xl font-semibold text-text-light dark:text-text-dark mb-4">
          Instrucciones para la Carga de Archivos
        </h3>
        <p className="mb-4 text-subtext-light dark:text-subtext-dark">
          Asegúrese de que su archivo (CSV o Excel) contenga las siguientes columnas en el orden exacto:
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
              <tr>
                <th className="p-2 font-semibold">Nombre de la Columna</th>
                <th className="p-2 font-semibold">Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200 p-1 rounded-md">CodigoISO_Pais</code>
                </td>
                <td className="p-2">Código ISO Alpha-3 del país (ej. "USA", "COL").</td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200  p-1 rounded-md">NombrePais</code>
                </td>
                <td className="p-2">Nombre completo del país.</td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200  p-1 rounded-md">ID_indicador</code>
                </td>
                <td className="p-2">Identificador único para el indicador.</td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200  p-1 rounded-md">Nombre_Indicador</code>
                </td>
                <td className="p-2">Nombre descriptivo del indicador.</td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200 p-1 rounded-md">Año</code>
                </td>
                <td className="p-2">Año al que corresponde el dato.</td>
              </tr>
              <tr className="border-b border-border-light dark:border-border-dark">
                <td className="p-2">
                  <code className="bg-gray-200  p-1 rounded-md">Valor</code>
                </td>
                <td className="p-2">Valor numérico del indicador.</td>
              </tr>
              <tr>
                <td className="p-2">
                  <code className="bg-gray-200  p-1 rounded-md">Unidad</code>
                </td>
                <td className="p-2">Unidad de medida del valor (ej. "Porcentaje", "Dólares").</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          {/* Download success notification */}
          {showDownloadSuccess && (
            <div className="mb-4 p-4 bg-blue-500 rounded-lg shadow-sm">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">
                    Plantilla descargada exitosamente
                  </p>
                  <p className="text-xs text-blue-100 mt-1">
                    El archivo se ha guardado en tu carpeta de descargas
                  </p>
                </div>
                <div className="ml-auto pl-3">
                  <button
                    onClick={() => setShowDownloadSuccess(false)}
                    className="inline-flex text-white hover:text-blue-200"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xls,.xlsx,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          {/* File selection display */}
          {selectedFile && (
            <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded-md">
              <div className="flex items-center">
                <span className="material-icons text-green-600 dark:text-green-400 mr-2">check_circle</span>
                <span className="text-green-800 dark:text-green-200 text-sm">
                  Archivo seleccionado: <strong>{selectedFile.name}</strong>
                </span>
              </div>
            </div>
          )}
          
          {/* Upload status */}
          {uploadStatus && (
            <div className={`mb-4 p-3 rounded-md ${
              uploadStatus.includes('exitosamente') 
                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 text-green-800 dark:text-green-200'
                : uploadStatus.includes('Procesando')
                ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 text-blue-800 dark:text-blue-200'
                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-800 dark:text-red-200'
            }`}>
              <div className="flex items-center">
                <span className="material-icons mr-2">
                  {uploadStatus.includes('exitosamente') ? 'check_circle' : 
                   uploadStatus.includes('Procesando') ? 'hourglass_empty' : 'error'}
                </span>
                <span className="text-sm">{uploadStatus}</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleFileUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={uploadStatus.includes('Procesando')}
            >
              <span className="material-icons mr-2">
                {selectedFile ? 'cloud_upload' : 'upload_file'}
              </span>
              {selectedFile ? 'Subir Archivo' : 'Seleccionar Archivo'}
            </button>
            <button 
              onClick={handleDownloadTemplate}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              <span className="material-icons mr-1">download</span>
              Descargar Plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;