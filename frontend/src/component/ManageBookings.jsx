import React from 'react';

const ManageBookings = () => {
    // Sample booking data
    const bookings = [
        { id: 1, player: 'John Doe', venue: 'Downtown Stadium', date: '2024-07-25', time: '10:00 AM', status: 'Confirmed' },
        { id: 2, player: 'Jane Smith', venue: 'City Arena', date: '2024-07-26', time: '12:00 PM', status: 'Pending' },
        // More bookings...
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-gray-300 md:border-none block md:table-row">
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Player</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Venue</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Date</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Time</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Status</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {bookings.map(booking => (
                            <tr key={booking.id} className="border border-gray-300 md:border-none block md:table-row">
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.player}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.venue}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.date}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.time}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.status}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">
                                    <button className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg">Edit</button>
                                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageBookings;
