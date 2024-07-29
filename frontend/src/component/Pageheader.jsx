// src/components/PageHeader.jsx
import React from 'react';
import PropTypes from 'prop-types';


const PageHeader = ({ title, backgroundImage }) => {
    return (
        <div 
            className="relative bg-cover bg-center bg-bottom h-80"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative flex items-center justify-center h-full">
                <h1 className="text-white text-5xl font-bold text-center">{title}</h1>
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    title: PropTypes.string.isRequired,
    backgroundImage: PropTypes.string.isRequired,
};

export default PageHeader;
