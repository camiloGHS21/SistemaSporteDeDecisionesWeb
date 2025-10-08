import React, { useState, useRef, useEffect } from 'react';
import LoadingIndicator from '../common/LoadingIndicator';
import Alert from '../common/Alert';

const FileUploadSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [showDownloadSuccess, setShowDownloadSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const fileInputRef = useRef(null);

  useEffect(() => {
    if (uploadStatus) {
      const lineCount = (uploadStatus.match(/\n/g) || []).length + 1;
      const duration = lineCount <= 2 ? 8000 : 18000;

      const timer = setTimeout(() => {
        setUploadStatus('');
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

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

  const handleClearSelectedFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setUploadStatus('');

    const chunkSize = 1024 * 1024; // 1MB
    const totalChunks = Math.ceil(selectedFile.size / chunkSize);
    let currentChunk = 0;
    const uploadId = `${Date.now()}-${selectedFile.name}`; // Unique ID for this upload
    const token = localStorage.getItem('token');

    while (currentChunk < totalChunks) {
      const start = currentChunk * chunkSize;
      const end = Math.min(start + chunkSize, selectedFile.size);
      const chunk = selectedFile.slice(start, end);

      const formData = new FormData();
      formData.append('file', chunk);
      formData.append('uploadId', uploadId);
      formData.append('fileName', selectedFile.name); // Original file name for the backend
      formData.append('chunkNumber', currentChunk);
      formData.append('totalChunks', totalChunks);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload-chunk`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        const resultText = await response.text();

        if (!response.ok) {
            let errorMessage = resultText;
            try {
                // The backend sends a ValidationErrorResponse on validation failure
                const errorJson = JSON.parse(resultText);
                if (errorJson.errors && Array.isArray(errorJson.errors)) {
                    errorMessage = errorJson.errors.join('\n');
                }
            } catch (e) {
                // If it's not JSON, use the plain text response
            }
            throw new Error(errorMessage);
        }

        const progress = Math.round(((currentChunk + 1) / totalChunks) * 100);
        setUploadProgress(progress);

        // The backend handles the final processing on the last chunk
        if (currentChunk === totalChunks - 1) {
            setIsProcessing(true); // Start the processing animation
            // We need to wait a bit to show the "processing" state.
            setTimeout(() => {
                let finalMessage = resultText;
                if (resultText.trim() === "File reassembled and processing started.") {
                    finalMessage = "Archivo reensamblado y procesando.";
                }
                setUploadStatus(finalMessage); // Final success message from server
                handleClearSelectedFile();
                setIsLoading(false);
                setIsProcessing(false);
            }, 2000); // Wait 2 seconds to show the processing animation
        }

        currentChunk++;

      } catch (error) {
        setIsLoading(false);
        setUploadStatus(error.message || 'Error al subir el archivo. Por favor, inténtelo de nuevo.');
        return; // Stop the upload on error
      }
    }
  };

  const handleDownloadTemplate = () => {
    // Create CSV template with the required columns
    const csvHeaders = [
      'pais',
      'tipo_indicador',
      'valor',
      'anio',
      'fuente'
    ];
    
    // Add sample data rows
    const sampleData= [
  ["España", "Innovación tecnológica", 0.477, 2024, "OMPI IGI"],
  ["España", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["España", "Gobierno digital", 0.9206, 2024, "ONU IDGE"],
  ["España", "Adopción de IA", 0.7, 2024, "FMI IPAI (Estimado 2024)"],
  ["España", "Conectividad de banda ancha", 0.84, 2024, "GSMA ICM"],

  ["Estados Unidos", "Innovación tecnológica", 0.624, 2024, "OMPI IGI"],
  ["Estados Unidos", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Estados Unidos", "Gobierno digital", 0.9195, 2024, "ONU IDGE"],
  ["Estados Unidos", "Adopción de IA", 0.79, 2024, "FMI IPAI (Estimado 2024)"],
  ["Estados Unidos", "Conectividad de banda ancha", 0.91, 2024, "GSMA ICM"],

  ["Reino Unido", "Innovación tecnológica", 0.61, 2024, "OMPI IGI"],
  ["Reino Unido", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Reino Unido", "Gobierno digital", 0.9577, 2024, "ONU IDGE"],
  ["Reino Unido", "Adopción de IA", 0.75, 2024, "FMI IPAI (Estimado 2024)"],
  ["Reino Unido", "Conectividad de banda ancha", 0.87, 2024, "GSMA ICM"],

  ["Canadá", "Innovación tecnológica", 0.543, 2024, "OMPI IGI"],
  ["Canadá", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Canadá", "Gobierno digital", 0.8452, 2024, "ONU IDGE"],
  ["Canadá", "Adopción de IA", 0.73, 2024, "FMI IPAI (Estimado 2024)"],
  ["Canadá", "Conectividad de banda ancha", 0.89, 2024, "GSMA ICM"],

  ["Australia", "Innovación tecnológica", 0.497, 2024, "OMPI IGI"],
  ["Australia", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Australia", "Gobierno digital", 0.9577, 2024, "ONU IDGE"],
  ["Australia", "Adopción de IA", 0.76, 2024, "FMI IPAI (Estimado 2024)"],
  ["Australia", "Conectividad de banda ancha", 0.93, 2024, "GSMA ICM"],

  ["Japón", "Innovación tecnológica", 0.546, 2024, "OMPI IGI"],
  ["Japón", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Japón", "Gobierno digital", 0.9351, 2024, "ONU IDGE"],
  ["Japón", "Adopción de IA", 0.77, 2024, "FMI IPAI (Estimado 2024)"],
  ["Japón", "Conectividad de banda ancha", 0.86, 2024, "GSMA ICM"],

  ["Alemania", "Innovación tecnológica", 0.581, 2024, "OMPI IGI"],
  ["Alemania", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Alemania", "Gobierno digital", 0.9382, 2024, "ONU IDGE"],
  ["Alemania", "Adopción de IA", 0.78, 2024, "FMI IPAI (Estimado 2024)"],
  ["Alemania", "Conectividad de banda ancha", 0.84, 2024, "GSMA ICM"],

  ["Francia", "Innovación tecnológica", 0.554, 2024, "OMPI IGI"],
  ["Francia", "Ciberseguridad", 1.0, 2024, "UIT IGC (Nivel)"],
  ["Francia", "Gobierno digital", 0.8744, 2024, "ONU IDGE"],
  ["Francia", "Adopción de IA", 0.7, 2024, "FMI IPAI (Estimado Eurozona 2024)"],
  ["Francia", "Conectividad de banda ancha", 0.85, 2024, "GSMA ICM"],

  ["Colombia", "Innovación tecnológica", 0.305, 2024, "OMPI IGI"],
  ["Colombia", "Ciberseguridad", 0.78, 2024, "UIT IGC (Nivel estimado)"],
  ["Colombia", "Gobierno digital", 0.7793, 2024, "ONU IDGE"],
  ["Colombia", "Adopción de IA", 0.55, 2024, "FMI IPAI (Estimado 2024)"],
  ["Colombia", "Conectividad de banda ancha", 0.71, 2024, "GSMA ICM"]
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
      setTimeout(() => setShowDownloadSuccess(false), 8000);
    }
  };

  return (
    <div>
      {isLoading && (
        <LoadingIndicator 
          message="Subiendo archivo..." 
          fileName={selectedFile.name}
          progress={uploadProgress}
          isProcessing={isProcessing}
        />
      )}
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
          {showDownloadSuccess && (
            <Alert 
              type="success" 
              title="Plantilla descargada exitosamente"
              message="El archivo se ha guardado en tu carpeta de descargas."
              onClose={() => setShowDownloadSuccess(false)}
            />
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
            <Alert 
              type="info"
              title="Archivo seleccionado:"
              message={selectedFile.name}
              onClose={handleClearSelectedFile}
            />
          )}
          
          {/* Upload status */}
          {uploadStatus && !isLoading && (
            <Alert
              type={uploadStatus.includes('exitosamente') || uploadStatus.includes('cargado') || uploadStatus.includes('procesando') ? 'success' : 'error'}
              title={uploadStatus.includes('exitosamente') || uploadStatus.includes('cargado') || uploadStatus.includes('procesando') ? 'Éxito:' : ''}
              message={uploadStatus}
              onClose={() => setUploadStatus('')}
            />
          )}
          
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleFileUpload}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {selectedFile ? 'Subir Archivo' : 'Seleccionar Archivo'}
            </button>
            <button 
              onClick={handleDownloadTemplate}
              className="inline-flex items-center text-sm font-medium text-primary hover:underline"
            >
              Descargar Plantilla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadSection;