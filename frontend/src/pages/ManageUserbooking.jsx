// src/pages/ManageUserBookings.jsx
import React from 'react';

const ManageUserBookings = () => {
    // Sample booking data
    const bookings = [
        { id: 1, venue: 'Downtown Stadium', date: '2024-07-25', time: '10:00 AM', status: 'Confirmed' },
        { id: 2, venue: 'City Arena', date: '2024-07-26', time: '12:00 PM', status: 'Pending' },
        // Add more bookings as needed
    ];

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Manage Your Bookings</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-left py-2 px-4 border-b">Venue</th>
                            <th className="text-left py-2 px-4 border-b">Date</th>
                            <th className="text-left py-2 px-4 border-b">Time</th>
                            <th className="text-left py-2 px-4 border-b">Status</th>
                            <th className="text-left py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.id} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b">{booking.venue}</td>
                                <td className="py-2 px-4 border-b">{booking.date}</td>
                                <td className="py-2 px-4 border-b">{booking.time}</td>
                                <td className={`py-2 px-4 border-b ${booking.status === 'Confirmed' ? 'text-green-500' : 'text-yellow-500'}`}>
                                    {booking.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button className="bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700">
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUserBookings;
