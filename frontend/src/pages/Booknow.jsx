// src/pages/BookNowPage.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../component/Navbar";
import PageHeader from "../component/Pageheader";
import VenueInfo from "../component/Venueinfo";
import api from "../api/axios";
import Toast from "../component/Toast"; // Assuming you have a Toast component
import UserAuth from "../auth/userauth";

const BookNowPage = () => {
  // const { slug } = useParams(); // Extract the slug from the URL
  console.log("slug=", window.location.pathname);
  const slug = window.location.pathname.split("/")[2];
  if(!UserAuth()){
    let returnPath = window.location.href;
    let isBooking =  {
      booking: true,
      returnUrl: returnPath
    }
    
    
    sessionStorage.setItem("isBooking",JSON.stringify(isBooking));
    window.location.href = "http://localhost:5173/login";
  }
  const [formData, setFormData] = useState({
    name: "",
    teamName: "",
    email: "",
    contactNo: "",
    altContactNo: "",
    players: "",
    date: "",
    time: "",
  });
  const [toast, setToast] = useState({
    message: "",
    status: "",
    visible: false,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("userLoginToken"); // Get the token from local storage
      const response = await api.post(
        "/user/booknow",
        {
          name: formData.name,
          teamname: formData.teamName,
          email: formData.email,
          contactNo: formData.contactNo,
          alternativeContactno: formData.altContactNo,
          numberofPlayers: formData.players,
          date: formData.date,
          time: formData.time,
          slug: slug, // Include the slug in the request body
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the authorization header
          },
        }
      );

      if (response.data.success) {
        console.log(response.data);
        // Send email notification
        await api.post(
          "/user/sendEmail",
          {
            to: formData.email,
            from: "MyArena Booking",
            subject: "Booking Confirmation",
            emailbody: `Dear ${formData.name},\n\nYour booking for ${formData.teamName} at ${response.data.venuename} on ${formData.date} at ${formData.time} has been successfully created.\n\nThank you for choosing MyArena!\n\nBest regards,\nMyArena Team`,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the authorization header for the email API as well
            },
          }
        );

        setToast({
          message: "Booking created and email sent successfully!",
          status: "success",
          visible: true,
        });
      } else {
        setToast({
          message: response.data.message,
          status: "fail",
          visible: true,
        });
      }
    } catch (error) {
      setToast({
        message: "Error creating booking or sending email. Please try again.",
        status: "fail",
        visible: true,
      });
      console.error("Error creating booking or sending email:", error);
    }
  };

  // Disabling past dates for the input date field
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <PageHeader
        title="Book Your Venue Now"
        backgroundImage="https://thumbs.dreamstime.com/b/stadium-cricket-night-bright-color-ai-generated-content-design-background-instagram-facebook-wall-painting-wallpaper-325372484.jpg"
      />
      <div className="container mx-auto px-4 py-6 flex flex-wrap md:flex-nowrap">
        {/* Left Sidebar - Venue Info */}
        <div className="w-full md:w-1/3 md:mr-8">
          <VenueInfo
            name="Downtown Stadium"
            location="Downtown, City"
            price={50}
            description="A premier venue for futsal and cricket games. Equipped with modern facilities and ample parking space."
          />
        </div>

        {/* Right Sidebar - Booking Form */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Team Name</label>
              <input
                type="text"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Contact No.</label>
              <input
                type="tel"
                name="contactNo"
                value={formData.contactNo}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Alternative Contact No.
              </label>
              <input
                type="tel"
                name="altContactNo"
                value={formData.altContactNo}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Number of Players</label>
              <input
                type="number"
                name="players"
                value={formData.players}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                min={today} // Prevents selecting past dates
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Time</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
            <div className="text-right">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </form>
          {toast.visible && (
            <Toast
              message={toast.message}
              status={toast.status}
              onClose={() => setToast({ ...toast, visible: false })}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookNowPage;
