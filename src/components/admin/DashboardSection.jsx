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

const ActivityItem = ({ avatar, name, action, subject, time }) => (
    <li className="flex items-center justify-between">
        <div className="flex items-center">
            <img alt="User avatar" className="w-8 h-8 rounded-full mr-3" src={avatar} />
            <div>
                <p className="font-medium">{name} <span className="text-subtext-light dark:text-subtext-dark font-normal">{action}</span></p>
                <p className="text-sm text-subtext-light dark:text-subtext-dark">{subject}</p>
            </div>
        </div>
        <span className="text-sm text-subtext-light dark:text-subtext-dark">{time}</span>
    </li>
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

    const activities = [
        {
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDD1fCdumBzF49JMyI4YaJ08HxwVbeX_JHgD7FOGIpz14je-mrKeFhluDXfs6ukPhoiQdcrOoMI6xI9L5JCiWim2kNUxciSoOEd0xGypCS2EU6kHcpncz1njfinMYj1toYZZkQ4LvKhgLMIrE3DzG9Zg3cWM7Nha-rY8bCyRGjx06pvE_Sb5b1GLRydfylK0yWTtYKjsADfPk1DWhLG6o54RpbfAXiA5DOdjcVUHdoaEzcB3WfcagY8zYrv4SqAt7wY6zaEj1FnAXY',
            name: 'Carlos Mendoza',
            action: 'generated a new report.',
            subject: 'Digital Policies Report',
            time: '2 hours ago',
        },
        {
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDvL5bFvxQJMPVabhZTIGwjVHxb7sGbtxgAPIjP3ua6VfXGJvUPEiNSHbbyft7aFYXrqAFUWMbWXYXQ9Xg64tgA9jE8uwpNj5RxtzW_36-kVoSMJbmPJLuwR65Xyu1iqTwgChUdVu39mGbzhi7qEUrOKho9cvwm_m8QakH5SoOywbnjRcJJuUGmk3gpi_LH0_rH7BgSlWnhQ7DdjZldGsj5quDKrCW5wrvozoum3uMPEXTNLqhiBavGnNbRZBGGDQgB59o88pptU8M',
            name: 'Sofia Ramirez',
            action: 'updated her profile.',
            subject: '',
            time: '5 hours ago',
        },
        {
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0L8wUcmMsYSLEjHI84usiGm6ZTC8TfGR9jScwUHkH0yLY1Fsplju1fDzJ-7hgwmM0I2vQGBMgOIFDmXrhs6Lxm5vRWJcHzgKxGREa8CBSTjudm4Bvs5cCyV6BG8H8qafboXaB--Ki7ZVwqGE2jmA3DvutQBI41WvOOYr06vLEkmHeKb0-3RdAB7XXGFJPujry7hBF4dvOP3S5gU763KV4biZQSSQbdlwT-g2Y7SIVJ0lelUAikcQKzu_mOEXavP43XDm19tPkvrk',
            name: 'Diego Torres',
            action: 'commented on an issue.',
            subject: '#1234: API connection error',
            time: '1 day ago',
        },
    ];

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
                <div className="flex items-center space-x-4">
                    <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <span className="material-icons text-subtext-light dark:text-subtext-dark">notifications</span>
                    </button>
                    <img alt="Admin avatar" className="w-10 h-10 rounded-full" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeL62W8MS9Wh8NcMF3iemzNg2R_1xztbvmwP0jQ2vnLTl891q5YM9jwQYOGSDVF0IBz_u0GDTEw1QeygqRsZP4qns2MrGvZGpOmbfqpbBaXjygsrufjhzdfGzO2Wxclic7ShFb7JxC553G48qF5RMgpRA9CCes_MYL0eY1xXx0-iE36dSikEnC9fq4GOrEKxyeEupU-FCg4z8WVvvZCZJ4_8t6Rsd6FYYVtT37moEmgv_ulnpYOqznpbQpvpwVk4RGhTZd1KFk-GA" />
                </div>
            </div>
            {loading && <p>Cargando...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statItems.map((stat, index) => <StatCard key={index} {...stat} />)}
                </div>
            )}
            <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                    {activities.map((activity, index) => <ActivityItem key={index} {...activity} />)}
                </ul>
            </div>
        </main>
    );
};

export default DashboardSection;   