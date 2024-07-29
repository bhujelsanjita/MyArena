// src/components/Toast.jsx
import React, { useEffect } from 'react';

const Toast = ({ message, status, onClose }) => {
    useEffect(() => {
        // Automatically close the toast after 5 seconds
        const timer = setTimeout(() => {
            onClose();
        }, 5000);

        // Clean up the timer when the component unmounts or dependencies change
        return () => clearTimeout(timer);
    }, [onClose]);

    // Determine the background color based on the status
    const bgColor = status === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${bgColor} flex items-center space-x-2`}>
            <span>{message}</span>
            <button onClick={onClose} className="text-white focus:outline-none">
                &times;
            </button>
        </div>
    );
};

export default Toast;
