import React, { useEffect, useState } from 'react';
import { ScallopedBadge } from "../../components/index.js";

const Dashboard = () => {
    const [stats] = useState({
        employees: 0,
        shifts: 0,
        bodyCameras: 0,
        recordings: 0,
        incidents: 0,
    });

    useEffect(() => {
        // const fetchStats = async () => {
        //     try {
        //         const [employeesRes, shiftsRes, camerasRes, recordingsRes] = await Promise.all([
        //             axios.get('/api/employees'),
        //             axios.get('/api/shifts'),
        //             axios.get('/api/cameras'),
        //             axios.get('/api/recordings'),
        //         ]);
        //
        //         setStats({
        //             employees: employeesRes.data.length,
        //             shifts: shiftsRes.data.length,
        //             cameras: camerasRes.data.length,
        //             recordings: recordingsRes.data.length,
        //         });
        //     } catch (error) {
        //         console.error('Error fetching stats:', error);
        //     }
        // };
        //
        // fetchStats();
    }, []);

    return (
        <div className="flex flex-col p-8 bg-[#0a0aa1] min-h-screen">
            <h1 className="text-4xl font-bold text-[#f5a944] mb-30">Dashboard</h1>

            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                    { label: 'Employees', count: stats.employees },
                    { label: 'Shifts', count: stats.shifts },
                    { label: 'Body Cameras', count: stats.bodyCameras },
                    { label: 'Recordings', count: stats.recordings },
                    { label: 'Incidents', count: stats.incidents },
                ].map(({ label, count }) => (
                    <div key={label} className="flex justify-center">
                        <ScallopedBadge key={label} label={label} count={count} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;