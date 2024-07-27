// src/components/ManagePlayers.jsx
import React from 'react';

const ManagePlayers = () => {
    // Sample player data
    const players = [
        { id: 1, name: 'John Doe', email: 'john.doe@example.com', contactNo: '123-456-7890', registeredDate: '2024-01-15' },
        { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', contactNo: '098-765-4321', registeredDate: '2024-02-10' },
        // More players...
    ];

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Players</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-gray-300 md:border-none block md:table-row">
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Name</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Email</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Contact No.</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Registered Date</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {players.map(player => (
                            <tr key={player.id} className="border border-gray-300 md:border-none block md:table-row">
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{player.name}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{player.email}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{player.contactNo}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{player.registeredDate}</td>
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

export default ManagePlayers;
