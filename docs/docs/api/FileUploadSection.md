--- 
sidebar_label: 'FileUploadSection'
---

# Componente FileUploadSection

## Descripción

`FileUploadSection` es un componente de React que proporciona una interfaz de usuario completa para que los usuarios puedan cargar sus propios conjuntos de datos en formato CSV o Excel. Gestiona la selección de archivos, la validación del tipo de archivo, la carga, el progreso de la subida y la visualización de estados (éxito, error, carga).

## Vista Previa

![Vista Previa de FileUploadSection](https://i.imgur.com/EjemploDeImagen.png) 
*Nota: La imagen es un ejemplo y puede no representar el estado actual del componente.*

## Funcionalidades

- **Selección y Validación de Archivos**: Permite al usuario seleccionar un archivo de su sistema. Valida que el archivo sea de un tipo permitido (CSV, XLS, XLSX).
- **Carga de Archivos con Progreso**: Utiliza `XMLHttpRequest` para subir el archivo a la API (`/api/upload`), permitiendo monitorizar el progreso de la carga en tiempo real.
- **Autenticación**: Adjunta el token de autenticación (obtenido del `localStorage`) en la cabecera de la solicitud de carga.
- **Feedback al Usuario**: 
  - Muestra un indicador de carga (`LoadingIndicator`) mientras el archivo se está subiendo.
  - Utiliza un componente `Alert` para mostrar el estado de la operación: archivo seleccionado, éxito en la carga o mensajes de error detallados provenientes de la API.
  - Limpia automáticamente los mensajes de estado después de un tiempo.
- **Descarga de Plantilla**: Ofrece un botón para descargar una plantilla CSV (`plantilla_datos_politicos.csv`) con la estructura de columnas requerida, para guiar al usuario en la preparación de sus datos.
- **Instrucciones Claras**: Muestra una tabla con las columnas requeridas y su descripción para asegurar que los datos subidos sean procesables.

## Estructura del Componente

- **Estado del Componente**: Utiliza `useState` para gestionar `selectedFile`, `uploadStatus`, `isLoading`, `uploadProgress`, etc.
- **Referencias**: Usa `useRef` para acceder al input de tipo `file` oculto.
- **Efectos**: Emplea `useEffect` para limpiar los mensajes de estado después de un período de tiempo.
- **Manejadores de Eventos**:
  - `handleFileSelect`: Se activa cuando el usuario elige un archivo.
  - `handleFileUpload`: Inicia el proceso de carga del archivo seleccionado.
  - `handleClearSelectedFile`: Permite al usuario deseleccionar un archivo.
  - `handleDownloadTemplate`: Genera y descarga dinámicamente la plantilla CSV.
- **Componentes Hijos**:
  - `LoadingIndicator`: Para mostrar durante la carga.
  - `Alert`: Para notificaciones y errores.

## Dependencias

- **React**: Para los hooks `useState`, `useRef`, `useEffect`.
- **../common/LoadingIndicator**: Componente para la visualización del progreso de carga.
- **../common/Alert**: Componente para mostrar mensajes al usuario.

## Código Fuente

```jsx
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

  const handleFileUpload = () => {
    if (!selectedFile) {
      fileInputRef.current?.click();
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);
    setUploadStatus('');

    const formData = new FormData();
    formData.append('file', selectedFile);
    const token = localStorage.getItem('token');

    const xhr = new XMLHttpRequest();

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setUploadProgress(100);
        setTimeout(() => {
          setIsLoading(false);
          setUploadStatus(`Archivo "${selectedFile.name}" cargado. El procesamiento ha comenzado.`);
          handleClearSelectedFile();
        }, 1000);
      } else {
        setIsLoading(false);
        let errorMessage = 'No se pudo cargar el archivo.';
        try {
            const errorResponse = JSON.parse(xhr.responseText);
            if (errorResponse.errors && Array.isArray(errorResponse.errors)) {
                errorMessage = errorResponse.errors.join('\n');
            } else if (errorResponse.error) {
                if (errorResponse.error.startsWith("File with name")) {
                    const fileNameMatch = errorResponse.error.match(/'(.*?)'/);
                    const fileName = fileNameMatch ? fileNameMatch[1] : '';
                    errorMessage = `Un archivo con el nombre '${fileName}' ya existe.`;
                } else if (errorResponse.error === "File with identical content already exists.") {
                    errorMessage = "Ya existe un archivo con contenido idéntico.";
                } else {
                    errorMessage = errorResponse.error;
                }
            } else {
                errorMessage = xhr.responseText;
            }
        } catch (e) {
            errorMessage = xhr.responseText || 'No se pudo cargar el archivo.';
        }
        setUploadStatus(errorMessage);
      }
    };

    xhr.onerror = () => {
      setIsLoading(false);
      setUploadStatus('Error de conexión al intentar cargar el archivo.');
    };

    xhr.open('POST', `${import.meta.env.VITE_API_URL}/api/upload`);
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    xhr.send(formData);
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
    const sampleData = [
      ['Colombia', 'Tasa de Desempleo', '5.8', '2023', 'Banco Mundial'],
      ['Colombia', 'PIB per capita', '45000.50', '2023', 'FMI'],
      ['Mexico', 'Tasa de Alfabetización', '99.1', '2022', 'UNESCO']
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
          message="Subiendo y procesando archivo..."
          fileName={selectedFile.name}
          progress={uploadProgress}
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
                <td className="p-2">Identificador ónico para el indicador.</td>
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
              type={uploadStatus.includes('exitosamente') || uploadStatus.includes('cargado') ? 'success' : 'error'}
              title={uploadStatus.includes('exitosamente') || uploadStatus.includes('cargado') ? 'Exito:': ''}
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
```