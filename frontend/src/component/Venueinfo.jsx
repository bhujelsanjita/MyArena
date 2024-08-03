// src/components/VenueInfo.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import Toast from "../component/Toast";

const VenueInfo = () => {
  // const { slug } = useParams(); // Get slug from URL parameters
  console.log("slug=", window.location.pathname);
  const slug = window.location.pathname.split("/")[2];
  const [venue, setVenue] = useState(null);
  const [toast, setToast] = useState({
    message: "",
    status: "",
    visible: false,
  });

  useEffect(() => {
    fetchVenueDetails();
  }, [slug]);

  const fetchVenueDetails = async () => {
    try {
      const response = await api.post("/admin/venue-details", { slug });
      if (response.data.success) {
        setVenue(response.data.data);
      } else {
        setToast({
          message: response.data.message,
          status: "fail",
          visible: true,
        });
      }
    } catch (error) {
      setToast({
        message: "Error fetching venue details. Please try again.",
        status: "fail",
        visible: true,
      });
      console.error("Error fetching venue details:", error);
    }
  };

  if (!venue) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <h2 className="text-2xl font-semibold">{venue.name}</h2>
      <p className="text-gray-600">{venue.address}</p>
      <p className="text-gray-800 font-semibold mt-2">
        Price: Rs.{venue.price} / hour
      </p>
      <p className="mt-4">{venue.description}</p>

      {toast.visible && (
        <Toast
          message={toast.message}
          status={toast.status}
          onClose={() => setToast({ ...toast, visible: false })}
        />
      )}
    </div>
  );
};

export default VenueInfo;
