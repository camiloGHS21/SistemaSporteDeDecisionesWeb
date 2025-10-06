
import React, { useState, useEffect } from 'react';
import { getReports, deleteReport, getReportContent } from '@api/admin';
import ConfirmationModal from '../common/ConfirmationModal';

const ReportCard = ({ report, onDelete, onView, onDownload }) => {
    const { id, title, user, date } = report;

    const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-subtext-light dark:text-subtext-dark mb-4 text-sm">Usuario: {user}</p>
            <div className="flex justify-between items-center text-sm text-subtext-light dark:text-subtext-dark">
                <span>{formattedDate}</span>
                <div className="flex items-center space-x-2">
                    <button onClick={() => onView(report)} className="text-subtext-light dark:text-subtext-dark hover:text-primary"><span className="material-icons text-base">visibility</span></button>
                    <button onClick={() => onDownload(id, title)} className="text-subtext-light dark:text-subtext-dark hover:text-primary"><span className="material-icons text-base">download</span></button>
                    <button onClick={() => onDelete(id)} className="text-subtext-light dark:text-subtext-dark hover:text-red-500"><span className="material-icons text-base">delete</span></button>
                </div>
            </div>
        </div>
    );
};

const ReportsSection = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
    const [reportToDelete, setReportToDelete] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const data = await getReports();
                setReports(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchReports();
    }, []);

    const handleDeleteRequest = (reportId) => {
        setReportToDelete(reportId);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (reportToDelete) {
            try {
                await deleteReport(reportToDelete);
                setReports(reports.filter((report) => report.id !== reportToDelete));
            } catch (error) {
                alert('Error al eliminar el informe.');
            }
        }
        setIsConfirmModalOpen(false);
        setReportToDelete(null);
    };

    const handleView = (report) => {
        setSelectedReport(report);
        setIsViewModalOpen(true);
    };

    const handleDownload = async (reportId, title) => {
        try {
            const blob = await getReportContent(reportId);
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            alert('Error al descargar el informe.');
        }
    };

    const filteredReports = reports.filter(report =>
        report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        report.user.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) return <p>Cargando informes...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Informes</h2>
                    <p className="text-subtext-light dark:text-subtext-dark">Gestiona y visualiza los informes del sistema</p>
                </div>
            
            </div>
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg mb-8">
                <div className="relative">
                    <span className="material-icons absolute left-3 top-1/2 -translate-y-1/2 text-subtext-light dark:text-subtext-dark">search</span>
                    <input
                        className="w-full pl-10 pr-4 py-2 border border-border-light dark:border-border-dark rounded-lg bg-background-light dark:bg-background-dark focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Buscar informes"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReports.map((report) => (
                    <ReportCard key={report.id} report={report} onDelete={handleDeleteRequest} onView={handleView} onDownload={handleDownload} />
                ))}
            </div>
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmDelete}
                title="Confirmar Eliminación"
                message="¿Estás seguro de que quieres eliminar este informe?"
            />

            {isViewModalOpen && selectedReport && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
                        <h2 className="text-2xl font-bold mb-4">Detalles del Informe</h2>
                        <div className="mb-4">
                            <strong>Título:</strong> {selectedReport.title}
                        </div>
                        <div className="mb-4">
                            <strong>Usuario:</strong> {selectedReport.user}
                        </div>
                        <div className="mb-4">
                            <strong>Fecha:</strong> {new Date(selectedReport.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </div>
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setIsViewModalOpen(false)} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};
export default ReportsSection;