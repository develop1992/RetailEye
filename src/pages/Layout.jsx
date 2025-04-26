import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/utils/auth.js';
import logo from '@/assets/logo.png';

export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = getCurrentUser();

    // Redirect unauthenticated users to login
    useEffect(() => {
        if (!user && location.pathname !== '/login') {
            navigate('/login');
        }
    }, [user, location.pathname, navigate]);

    // If on login page, skip sidebar layout
    if (location.pathname === '/login') return <Outlet />;

    return (
        <div className="flex w-full min-h-screen">
            <aside className="w-64 bg-[#6e9b85] text-white p-4 flex flex-col h-screen justify-between overflow-auto">
                {/* Top section: logo + nav */}
                <div>
                    <Link to={user?.role === 'admin' ? "/" : "/pick-up-shifts"} className="mb-6 flex justify-center nav-aside">
                        <img src={logo} alt="RetailEye Logo" className="h-40 w-auto" />
                    </Link>

                    <nav className="flex flex-col space-y-4 w-full items-start">

                        {user?.role === 'admin' ? (
                            <>
                                <Link to="/" className="text-left w-full nav-aside" >Dashboard</Link>
                                <Link to="/employees" className="text-left w-full nav-aside">Employees</Link>
                                <Link to="/shifts" className="text-left w-full nav-aside">Shifts</Link>
                                <Link to="/body-cameras" className="text-left w-full nav-aside">Body Cameras</Link>
                                <Link to="/recordings" className="text-left w-full nav-aside">Recordings</Link>
                                <Link to="/incidents" className="text-left w-full nav-aside">Incidents</Link>
                            </>
                        ) :
                            <Link to="/pick-up-shifts" className="text-left w-full nav-aside">Shift Management</Link>
                        }
                    </nav>
                </div>

                {/* Bottom section: logout button styled as nav */}
                <div className="border-t border-white pt-4 mt-4 text-left">
                    <Link to="/logout" className="text-left w-full nav-aside">Logout</Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="main-content flex-1 bg-[#0a0aa1] p-6 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};