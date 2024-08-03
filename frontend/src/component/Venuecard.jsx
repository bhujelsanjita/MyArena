import React from "react";

const VenueCard = ({ image, location, venueType, price,slug}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4">
      <img src={image} alt={venueType} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{location}</h3>
        <p className="text-gray-600">{venueType}</p>
        <p className="text-gray-800 font-semibold">Price: Rs.{price} / hour</p>
        <a href={"/explore/"+slug}>
          <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700">
            Book Now
          </button>
        </a>
      </div>
    </div>
  );
};

export default VenueCard;
