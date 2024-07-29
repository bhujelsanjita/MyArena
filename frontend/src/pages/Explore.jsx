import React from 'react';
import Navbar from '../component/Navbar';
import VenueCard from '../component/Venuecard';
import PageHeader from '../component/Pageheader';


const ExplorePage = () => {
    return (
        <div className="min-h-screen bg-blue-100">
            <Navbar />
            <PageHeader title={"Find the best Arena"} backgroundImage='https://i0.wp.com/isibangunan.com/wp-content/uploads/2017/12/Harga-Karpet-Karpet-Vinyl-Futsal-Per-Meter.jpg?fit=800%2C350&ssl=1'/>
            
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Explore Futsal and Cricket Grounds</h1>
                <div className="flex">
                    {/* Left Sidebar - Filters */}
                    <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Filters</h2>
                        <div className="mb-4">
                            <h3 className="text-lg font-medium">Venue Type</h3>
                            <div>
                                <input type="checkbox" id="futsal" className="mr-2" />
                                <label htmlFor="futsal">Futsal</label>
                            </div>
                            <div>
                                <input type="checkbox" id="cricket" className="mr-2" />
                                <label htmlFor="cricket">Cricket</label>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium">Location</h3>
                            <select className="w-full p-2 border rounded-lg">
                                <option value="">Kathmandu</option>
                                <option value="location1">Koteshwor</option>
                                <option value="location2">Shantinagar</option>
                                <option value="location3">Baneshwor</option>
                            </select>
                        </div>
                    </div>
                    
                    {/* Right Sidebar - Venue Listings */}
                    <div className="w-full md:w-3/4 md:pl-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                        <VenueCard 
                            image="https://via.placeholder.com/150"
                            location="Downtown Stadium"
                            venueType="Futsal"
                            price={50}
                        />
                        <VenueCard 
                            image="https://via.placeholder.com/150"
                            location="City Arena"
                            venueType="Cricket"
                            price={75}
                        />
                        <VenueCard 
                            image="https://via.placeholder.com/150"
                            location="Uptown Grounds"
                            venueType="Futsal"
                            price={60}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExplorePage;
