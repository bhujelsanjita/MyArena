// src/pages/EditVenue.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const EditVenue = () => {
    const { venueId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        type: 'Futsal',
        image: null,
        status: 'Available',
        ownerId: '', // Assuming you have the ownerId or will fetch it
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });
    const [venueIdFromData, setVenueIdFromData] = useState(null); // New state for the ID from response
    const navigate = useNavigate();

    useEffect(() => {
        fetchVenueDetails();
    }, [venueId]);

    const fetchVenueDetails = async () => {
        try {
            const response = await api.post(`/admin/venue-details`, { slug: venueId });
            if (response.data.success) {
                const venue = response.data.data;
                setVenueIdFromData(response.data.data.id); // Store the ID from the response data
                setFormData({
                    ...venue,
                    image: null, // Keep the existing image unchanged initially
                });
            } else {
                setToast({ message: 'Failed to fetch venue details', status: 'fail', visible: true });
            }
        } catch (error) {
            console.error('Error fetching venue details:', error);
            setToast({ message: 'Error fetching venue details', status: 'fail', visible: true });
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('type', formData.type);
        if (formData.image) {
            formDataToSend.append('image', formData.image);
        }
        formDataToSend.append('status', formData.status);
        formDataToSend.append('ownerId', formData.ownerId);

        try {
            const token = localStorage.getItem('venueOwnerLoginToken');
            const response = await api.patch(`/admin/venues/${venueIdFromData}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setToast({ message: 'Venue updated successfully!', status: 'success', visible: true });
            setTimeout(() => {
                navigate('/dashboard/venues');
            }, 1000); // Redirect after 1 second
        } catch (error) {
            setToast({ message: 'Error updating venue. Please try again.', status: 'fail', visible: true });
            console.error('Error updating venue:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Edit Venue</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Venue Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Address</label>
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="Futsal">Futsal</option>
                        <option value="Cricksal">Cricksal</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Status</label>
                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    >
                        <option value="Available">Available</option>
                        <option value="Unavailable">Unavailable</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Image</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Update Venue
                </button>
            </form>
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

export default EditVenue;
