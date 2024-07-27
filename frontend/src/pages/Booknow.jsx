// src/pages/BookNowPage.jsx
import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import PageHeader from '../component/Pageheader';
import VenueInfo from '../component/Venueinfo';

const BookNowPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        teamName: '',
        email: '',
        contactNo: '',
        altContactNo: '',
        players: '',
        date: '',
        time: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Submit form data to your backend or API
    };

    // Disabling past dates for the input date field
    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <PageHeader 
                title="Book Your Venue Now" 
                backgroundImage="https://via.placeholder.com/1920x1080"
            />
            <div className="container mx-auto px-4 py-6 flex flex-wrap md:flex-nowrap">
                {/* Left Sidebar - Venue Info */}
                <div className="w-full md:w-1/3 md:mr-8">
                    <VenueInfo 
                        name="Downtown Stadium"
                        location="Downtown, City"
                        price={50}
                        description="A premier venue for futsal and cricket games. Equipped with modern facilities and ample parking space."
                    />
                </div>
                
                {/* Right Sidebar - Booking Form */}
                <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Name</label>
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
                            <label className="block text-gray-700">Team Name</label>
                            <input 
                                type="text"
                                name="teamName"
                                value={formData.teamName}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Email</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Contact No.</label>
                            <input 
                                type="tel"
                                name="contactNo"
                                value={formData.contactNo}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Alternative Contact No.</label>
                            <input 
                                type="tel"
                                name="altContactNo"
                                value={formData.altContactNo}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Number of Players</label>
                            <input 
                                type="number"
                                name="players"
                                value={formData.players}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Date</label>
                            <input 
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                min={today} // Prevents selecting past dates
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700">Time</label>
                            <input 
                                type="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className="w-full p-2 border rounded-lg"
                                required
                            />
                        </div>
                        <div className="text-right">
                            <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookNowPage;
