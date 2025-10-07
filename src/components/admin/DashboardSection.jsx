import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '@api/admin';

const StatCard = ({ icon, label, value, color }) => (
    <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm flex items-center">
        <div className={`p-3 bg-${color}-100 dark:bg-${color}-900/50 rounded-lg mr-4`}>
            <span className={`material-icons text-${color}-500 text-2xl`}>{icon}</span>
        </div>
        <div>
            <p className="text-subtext-light dark:text-subtext-dark text-sm">{label}</p>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
    </div>
);



const DashboardSection = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const data = await getDashboardStats();
                setStats(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

   


    const statItems = stats ? [
        { icon: 'people', label: 'Total Users', value: stats.totalUsers, color: 'blue' },
        { icon: 'description', label: 'Reports Generated', value: stats.reportsGenerated, color: 'green' },
        { icon: 'visibility', label: 'Site Visits', value: stats.siteVisits, color: 'yellow' },
        { icon: 'error_outline', label: 'Open Issues', value: stats.openIssues, color: 'red' },
    ] : [];

    return (
        <main className="flex-1 p-8 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Dashboard</h2>
                    <p className="text-subtext-light dark:text-subtext-dark">Welcome back, Admin!</p>
                </div>
            </div>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statItems.map((stat, index) => <StatCard key={index} {...stat} />)}
                </div>
            )}
        </main> 
    );
};

export default DashboardSection;   