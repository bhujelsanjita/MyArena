// src/pages/About.jsx
import React from 'react';
import Navbar from '../component/Navbar';

const About = () => {
    return (
        <>
        <Navbar />
        
        <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
            <div className="max-w-4xl bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">About Us</h1>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                    Welcome to our platform! We are dedicated to providing the best experience for our users.
                    Our team is passionate about building high-quality products that meet your needs and
                    exceed your expectations.
                </p>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Mission</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Our mission is to empower individuals and businesses through innovative technology
                        solutions. We strive to create a seamless and enjoyable experience for everyone who uses
                        our platform.
                    </p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Our Team</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        Our team consists of experienced professionals from various fields, including software
                        development, design, marketing, and customer support. We are united by our commitment to
                        excellence and our passion for creating impactful products.
                    </p>
                </div>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">Contact Us</h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        If you have any questions, feedback, or would like to get in touch with us, please do not
                        hesitate to contact us at <a href="mailto:support@example.com" className="text-indigo-600 hover:underline">bhujelsanjita7@gmail.com</a>.
                    </p>
                </div>
            </div>
        </div>
        </>
    );
};

export default About;
