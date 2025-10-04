import React from 'react';

const alertStyles = {
  info: {
    container: 'text-blue-800 bg-blue-50',
    closeButton: 'bg-blue-50 text-blue-500 focus:ring-blue-400 hover:bg-blue-200'
  },
  success: {
    container: 'text-green-800 bg-green-50',
    closeButton: 'bg-green-50 text-green-500 focus:ring-green-400 hover:bg-green-200'
  },
  error: {
    container: 'text-red-800 bg-red-50',
    closeButton: 'bg-red-50 text-red-500 focus:ring-red-400 hover:bg-red-200'
  },
};

const alertScreenReaderText = {
    info: 'Info',
    success: 'Éxito',
    error: 'Error'
}

const Alert = ({ type = 'info', title, message, onClose }) => {
  const styles = alertStyles[type];
  const srText = alertScreenReaderText[type];

  return (
    <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${styles.container}`} role="alert">
      <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
      </svg>
      <span className="sr-only">{srText}</span>
      <div className="flex-grow max-h-32 overflow-y-auto" style={{ whiteSpace: 'pre-wrap' }}>
        {title && <span className="font-medium">{title} </span>}
        {message}
      </div>
      {onClose && (
         <button type="button" className={`ms-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex items-center justify-center h-8 w-8 ${styles.closeButton}`} onClick={onClose} aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
      )}
    </div>
  );
};

export default Alert;