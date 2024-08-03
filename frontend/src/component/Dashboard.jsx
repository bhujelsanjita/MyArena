// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const Dashboard = () => {
    const [recentOrders, setRecentOrders] = useState([]);
    const [statistics, setStatistics] = useState({
        totalUsers: 0,
        totalBookings: 0,
        totalVenues: 0,
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });

    useEffect(() => {
        fetchRecentBookings();
        fetchStatistics();
    }, []);

    const fetchRecentBookings = async () => {
        try {
            const token = localStorage.getItem('venueOwnerLoginToken'); // Get the token from local storage
            const response = await api.get('/admin/booking-lists', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                const bookings = response.data.data;
                const sortedBookings = bookings.sort((a, b) => new Date(b.date) - new Date(a.date));
                setRecentOrders(sortedBookings.slice(0, 2)); // Get the two most recent bookings
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: 'Error fetching recent bookings. Please try again.', status: 'fail', visible: true });
            console.error('Error fetching recent bookings:', error);
        }
    };

    const fetchStatistics = async () => {
        try {
            const token = localStorage.getItem('venueOwnerLoginToken'); // Get the token from local storage
            const response = await api.get('/user/statistics', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                setStatistics(response.data.data);
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: 'Error fetching statistics. Please try again.', status: 'fail', visible: true });
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
                <ul>
                    {recentOrders.map(order => (
                        <li key={order.id} className="border-b last:border-b-0 py-2">
                            <div><strong>Player:</strong> {order['user.name']}</div>
                            <div><strong>Venue:</strong> {order['venue.name']}</div>
                            <div><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</div>
                            <div><strong>Amount:</strong> Rs.{order['venue.price']}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold">Total Bookings</h3>
                    <p className="text-2xl">{statistics.totalBookings}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold">Total Venues</h3>
                    <p className="text-2xl">{statistics.totalVenues}</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <h3 className="text-xl font-semibold">Total Users</h3>
                    <p className="text-2xl">{statistics.totalUsers}</p>
                </div>
            </div>
            {toast.visible && (
                <Toast
                    message={toast.message}
                    status={toast.status}
                    onClose={() => setToast({ ...toast, visible: false })}
                />
            )}
        </div>
    );
};

export default Dashboard;
