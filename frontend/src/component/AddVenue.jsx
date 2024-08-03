// src/components/AddVenue.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Toast from '../component/Toast'; // Assuming you have a Toast component

const AddVenue = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        type: 'Futsal',
        image: null,
        status: 'Available',
        ownerId: '', // Set this based on the authenticated user or other logic
        price: '',
        description: '',
        slug: ''
    });
    const [toast, setToast] = useState({ message: '', status: '', visible: false });
    const navigate = useNavigate();

    useEffect(() => {
        const slug = generateSlug(formData.name);
        setFormData(prevState => ({ ...prevState, slug }));
    }, [formData.name]);

    const generateSlug = (name) => {
        const timestamp = Date.now(); // Unix timestamp in milliseconds
        return `${name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}-${timestamp}`;
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
        formDataToSend.append('image', formData.image);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('ownerId', formData.ownerId);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description',formData.description);
        formDataToSend.append('slug', generateSlug(formData.name));
        console.log(formDataToSend);

        try {
            const token = localStorage.getItem('venueOwnerLoginToken');
            const response = await api.post('/admin/addvenue', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
            });
            setToast({ message: 'Venue added successfully!', status: 'success', visible: true });
            setTimeout(() => {
                navigate('/dashboard/venues');
            }, 1000); // Redirect after 1 second
        } catch (error) {
            setToast({ message: 'Error adding venue. Please try again.', status: 'fail', visible: true });
            console.error('Error adding venue:', error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Add New Venue</h2>
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
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Price</label>
                    <input
                        type="text"
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Description</label>
                    <input
                        type="text"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="w-full p-2 border rounded-lg"
                        required
                    />
                </div>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
                    Add Venue
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

export default AddVenue;
