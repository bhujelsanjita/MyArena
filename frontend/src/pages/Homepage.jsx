import React from 'react';
import './Pages.css';
import Navbar from '../component/Navbar';
import Usetitle from '../component/Usetitle';
import { Link } from 'react-router-dom';

const HomePage = () => {
    Usetitle("Homepage - MyArena");
    return (
        <div className="homepage-container">
            <Navbar />
            <div className="hero-container">
                <div className="hero-content">
                    <h1>Book Your Futsal and Cricket Grounds</h1>
                    <p>Easy and fast booking for your favorite sports venues</p>
                    
                    <Link to="/explore" >
                    <button className="cta-button">Book Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
