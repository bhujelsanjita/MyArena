import React from "react";

const VenueCard = ({ image, location, venueType, price, slug, availability }) => {
  return (
    <div className="relative bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <img src={image} alt={venueType} className="w-full h-48 object-cover" />
      <div
        className={`absolute top-2 left-2 px-2 py-1 rounded-full text-white text-sm bg-opacity-90 ${
          availability === 'Available' ? 'bg-green-500' : 'bg-red-500'
        }`}
      >
        {availability === 'Available' ? 'Available' : 'Unavailable'}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-bold">{location}</h3>
        <p className="text-gray-600">{venueType}</p>
        <p className="text-gray-800 font-semibold">Price: Rs.{price} / hour</p>
        <a href={"/explore/" + slug}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700">
            Book Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default VenueCard;
