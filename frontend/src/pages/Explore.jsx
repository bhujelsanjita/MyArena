// src/pages/ExplorePage.jsx
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import VenueCard from "../component/Venuecard";
import PageHeader from "../component/Pageheader";
import Usetitle from "../component/Usetitle";
import api from "../api/axios"; // Assuming you have an Axios instance set up

const ExplorePage = () => {
  Usetitle("Explore - Find the best venue");

  const [venues, setVenues] = useState([]);
  const [filteredVenues, setFilteredVenues] = useState([]);
  const [filters, setFilters] = useState({
    type: "",
    location: "",
  });

  useEffect(() => {
    fetchVenues();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, venues]);

  const fetchVenues = async () => {
    try {
      const response = await api.get("/admin/list-venue");
      setVenues(response.data.data);
      setFilteredVenues(response.data.data);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const applyFilters = () => {
    let filtered = venues;
    if (filters.type) {
      filtered = filtered.filter(
        (venue) => venue.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    if (filters.location) {
      filtered = filtered.filter((venue) =>
        venue.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }
    setFilteredVenues(filtered);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <Navbar />
      <PageHeader
        title={"Find the best Arena"}
        backgroundImage="https://thumbs.dreamstime.com/b/cricket-stadium-cricket-night-colorful-lights-cricket-world-cup-ai-generated-content-cricket-stadium-cricket-night-colorful-325001768.jpg"
      />

      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6">
          Explore Futsal and Cricket Grounds
        </h1>
        <div className="flex">
          {/* Left Sidebar - Filters */}
          <div className="w-full md:w-1/4 bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            <div className="mb-4">
              <h3 className="text-lg font-medium">Venue Type</h3>
              <div>
                <input
                  type="radio"
                  id="futsal"
                  name="type"
                  value="Futsal"
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor="futsal">Futsal</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="cricket"
                  name="type"
                  value="Cricksal"
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                <label htmlFor="cricket">Cricket</label>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium">Location</h3>
              <select
                name="location"
                onChange={handleFilterChange}
                className="w-full p-2 border rounded-lg"
              >
                <option value="">Select Location</option>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Koteshwor">Koteshwor</option>
                <option value="Shantinagar">Shantinagar</option>
                <option value="Baneshwor">Baneshwor</option>
              </select>
            </div>
          </div>

          {/* Right Sidebar - Venue Listings */}
          <div className="w-full md:w-3/4 md:pl-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredVenues.map((venue) => {
                console.log(venue);
           return (  <VenueCard
                key={venue.id}
                image={venue.image}
                location={venue.address}
                venueType={venue.type}
                price={venue.price}
                slug={venue.slug}
                availability={venue.status}
                // Assuming price information is added in the venue data model
              />);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage;
