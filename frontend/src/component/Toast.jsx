// src/components/Toast.jsx
import React, { useEffect, useState } from 'react';

const Toast = ({ message, status, onClose }) => {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const duration = 5000; // 5 seconds
        const interval = 50; // Update every 50ms

        // Calculate the decrement for each interval
        const decrement = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev <= 0) {
                    clearInterval(timer);
                    onClose();
                    return 0;
                }
                return prev - decrement;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onClose]);

    const bgColor = status === 'success' ? 'bg-green-500' : 'bg-red-500';

    return (
        <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${bgColor} max-w-xs w-full`}>
            <div className="flex items-center justify-between">
                <span>{message}</span>
                <button onClick={onClose} className="ml-4 text-white font-bold">
                    &times;
                </button>
            </div>
            <div className="mt-2 bg-gray-200 rounded-full h-1">
                <div
                    style={{ width: `${progress}%` }}
                    className="bg-white h-full rounded-full transition-all duration-50"
                ></div>
            </div>
        </div>
    );
};

export default Toast;
