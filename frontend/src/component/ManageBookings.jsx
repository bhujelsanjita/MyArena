import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [toast, setToast] = useState({ message: '', status: '', visible: false });
    const [modal, setModal] = useState({ visible: false, action: '', bookingId: '' });
    const [detailsModal, setDetailsModal] = useState({ visible: false, booking: null });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const token = localStorage.getItem('venueOwnerLoginToken'); // Get the token from local storage
            const response = await api.get('/admin/booking-lists', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                setBookings(response.data.data);
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: 'Error fetching bookings. Please try again.', status: 'fail', visible: true });
            console.error('Error fetching bookings:', error);
        }
    };

    const handleAction = (action, bookingId) => {
        setModal({ visible: true, action, bookingId });
    };

    const confirmAction = async () => {
        const { action, bookingId } = modal;
        setModal({ ...modal, visible: false });

        try {
            const token = localStorage.getItem('venueOwnerLoginToken'); // Get the token from local storage
            const newStatus = action === 'approve' ? 'APPROVED' : 'CANCELLED';
            const response = await api.patch('/user/change-bookingstatus', { bookingId, newstatus: newStatus }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                setToast({ message: `Booking ${action}d successfully!`, status: 'success', visible: true });
                fetchBookings(); // Refresh the bookings list
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: `Error ${action}ing booking. Please try again.`, status: 'fail', visible: true });
            console.error(`Error ${action}ing booking:`, error);
        }
    };

    const viewDetails = (booking) => {
        setDetailsModal({ visible: true, booking });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Bookings</h2>
            <div className="bg-white shadow-lg rounded-lg p-4">
                <table className="min-w-full border-collapse block md:table">
                    <thead className="block md:table-header-group">
                        <tr className="border border-gray-300 md:border-none block md:table-row">
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">User Name</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Venue Name</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Date</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Time</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Price</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Status</th>
                            <th className="p-2 md:border md:border-gray-300 text-left block md:table-cell">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="block md:table-row-group">
                        {bookings.map(booking => (
                            <tr key={booking.id} className="border border-gray-300 md:border-none block md:table-row">
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking['user.name']}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking['venue.name']}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.time}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">Rs. {booking['venue.price']}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">{booking.status}</td>
                                <td className="p-2 md:border md:border-gray-300 block md:table-cell">
                                    <button 
                                        className="bg-green-600 text-white px-4 py-2 mr-2 rounded-lg"
                                        onClick={() => handleAction('approve', booking.id)}
                                    >
                                        Approve
                                    </button>
                                    <button 
                                        className="bg-red-600 text-white px-4 py-2 mr-2 rounded-lg"
                                        onClick={() => handleAction('cancel', booking.id)}
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                        onClick={() => viewDetails(booking)}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {toast.visible && (
                <Toast
                    message={toast.message}
                    status={toast.status}
                    onClose={() => setToast({ ...toast, visible: false })}
                />
            )}

            {modal.visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Confirm Action</h2>
                        <p>Are you sure you want to {modal.action} this booking?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 mr-2 rounded-lg"
                                onClick={() => setModal({ ...modal, visible: false })}
                            >
                                Cancel
                            </button>
                            <button
                                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
                                onClick={confirmAction}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {detailsModal.visible && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold mb-4">Booking Details</h2>
                        <p><strong>User Name:</strong> {detailsModal.booking['user.name']}</p>
                        <p><strong>Venue Name:</strong> {detailsModal.booking['venue.name']}</p>
                        <p><strong>Date:</strong> {new Date(detailsModal.booking.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {detailsModal.booking.time}</p>
                        <p><strong>Price:</strong> Rs. {detailsModal.booking['venue.price']}</p>
                        <p><strong>Status:</strong> {detailsModal.booking.status}</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                                onClick={() => setDetailsModal({ ...detailsModal, visible: false })}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBookings;
