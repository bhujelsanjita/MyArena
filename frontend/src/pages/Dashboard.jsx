// src/pages/AdminDashboard.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopNavbar from '../component/TopNavbar';
import SideNavbar from '../component/SideNavbar';

const DashboardIndex = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex">
            <SideNavbar />
            <div className="flex-1">
                <TopNavbar />
                <div className="p-4">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardIndex;
