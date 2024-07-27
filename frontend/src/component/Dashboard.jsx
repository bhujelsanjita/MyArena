// src/components/Dashboard.jsx
import React from 'react';

const Dashboard = () => {
    // Sample data
    const recentOrders = [
        { id: 1, player: 'John Doe', venue: 'Downtown Stadium', date: '2024-07-25', amount: '$100' },
        { id: 2, player: 'Jane Smith', venue: 'City Arena', date: '2024-07-24', amount: '$75' },
        // More data...
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
            <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
                <ul>
                    {recentOrders.map(order => (
                        <li key={order.id} className="border-b last:border-b-0 py-2">
                            <div><strong>Player:</strong> {order.player}</div>
                            <div><strong>Venue:</strong> {order.venue}</div>
                            <div><strong>Date:</strong> {order.date}</div>
                            <div><strong>Amount:</strong> {order.amount}</div>
                        </li>
                    ))}
                </ul>
            </div>
            <h2 className="text-2xl font-semibold mb-4">Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Replace with actual stats */}
                <div className="bg-white shadow-lg rounded-lg p-4">Total Bookings: 150</div>
                <div className="bg-white shadow-lg rounded-lg p-4">Total Venues: 20</div>
                <div className="bg-white shadow-lg rounded-lg p-4">Total Players: 300</div>
            </div>
        </div>
    );
};

export default Dashboard;
