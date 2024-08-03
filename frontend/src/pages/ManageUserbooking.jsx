import React, { useEffect, useState } from 'react';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const ManageUserBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [toast, setToast] = useState({ message: '', status: '', visible: false });
    const [modal, setModal] = useState({ visible: false, bookingId: null });

    useEffect(() => {
        fetchUserBookings();
    }, []);

    const fetchUserBookings = async () => {
        try {
            const token = localStorage.getItem('userLoginToken'); // Get the token from local storage
            const response = await api.get('/user/mybookings', {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                setBookings(Array.isArray(response.data.data) ? response.data.data : [response.data.data]); // Ensure the data is an array
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: 'Error fetching bookings. Please try again.', status: 'fail', visible: true });
            console.error('Error fetching bookings:', error);
        }
    };

    const handleCancel = (bookingId) => {
        setModal({ visible: true, bookingId });
    };

    const confirmCancel = async () => {
        const { bookingId } = modal;
        setModal({ ...modal, visible: false });

        try {
            const token = localStorage.getItem('userLoginToken'); // Get the token from local storage
            const response = await api.patch('/user/change-bookingstatus', { bookingId, newstatus: 'CANCELLED' }, {
                headers: {
                    'Authorization': `Bearer ${token}` // Include the authorization header
                }
            });
            if (response.data.success) {
                setToast({ message: 'Booking cancelled successfully!', status: 'success', visible: true });
                fetchUserBookings(); // Refresh the bookings list
            } else {
                setToast({ message: response.data.message, status: 'fail', visible: true });
            }
        } catch (error) {
            setToast({ message: 'Error cancelling booking. Please try again.', status: 'fail', visible: true });
            console.error('Error cancelling booking:', error);
        }
    };

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
                                <td className="py-2 px-4 border-b">{booking['venue.name'] || 'N/A'}</td>
                                <td className="py-2 px-4 border-b">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border-b">{booking.time}</td>
                                <td className={`py-2 px-4 border-b ${booking.status === 'Confirmed' ? 'text-green-500' : booking.status === 'CANCELLED' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {booking.status}
                                </td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        className={`bg-red-600 text-white py-1 px-3 rounded-lg hover:bg-red-700 ${booking.status === 'CANCELLED' || booking.status === 'APPROVED' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        onClick={() => handleCancel(booking.id)}
                                        disabled={booking.status === 'CANCELLED' || booking.status === 'APPROVED'}
                                    >
                                        Cancel
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
                        <h2 className="text-2xl font-semibold mb-4">Confirm Cancel</h2>
                        <p>Are you sure you want to cancel this booking?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                className="bg-gray-600 text-white px-4 py-2 mr-2 rounded-lg"
                                onClick={() => setModal({ visible: false, bookingId: null })}
                            >
                                No
                            </button>
                            <button
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                                onClick={confirmCancel}
                            >
                                Yes, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUserBookings;
