import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Navbar from './component/Navbar.jsx';
import HomePage from "./pages/Homepage.jsx";
import ExplorePage from "./pages/Explore.jsx";
import BookNowPage from "./pages/Booknow.jsx";
import Dashboard from "./component/Dashboard";
import VenueList from "./component/VenueList";
import AddVenue from "./component/AddVenue";
import ManageBookings from "./component/ManageBookings";
import ManagePlayers from "./component/ManagePlayers";
import LoginPage from "./pages/VenueOwnerLoginPage.jsx.jsx";
import UserRegistrationPage from "./pages/Userregistration.jsx";
import UserLoginPage from "./pages/UserLogin.jsx";
import ForgotPasswordPage from "./pages/Forgotpassword.jsx";
import UserDashboard from "./pages/Userdashboard";
import ManageUserBookings from "./pages/ManageUserbooking";
import ChangePassword from "./pages/Changepassword";
import Profile from "./pages/Profile";
import Logout from "./pages/Logout.jsx";
import About from "./pages/About";
import VenueOwnerRegistrationPage from "./pages/VenueownerRegistration.jsx";
import DashboardIndex from "./pages/Dashboard.jsx";
import VenueOwnerLogout from "./pages/VenueOwnerLogout.jsx";
import EditVenue from "./component/EditVenue.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/explore/:slog",
    element: <BookNowPage />,
  },
  {
    path: "/dashboard",
    element: <DashboardIndex />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "venues", element: <VenueList /> },
      { path: "venues/add", element: <AddVenue /> },
      { path: "bookings", element: <ManageBookings /> },
      { path: "players", element: <ManagePlayers /> },
      { path: "venues/edit/:venueId",element: <EditVenue />}
    ],
  },
  {
    path:"/dashboard/logout",
    element:<VenueOwnerLogout />
  },
  {
    path: "/venueowner/login",
    element: <LoginPage />,
  },
  {
    path: "/venueowner/register",
    element: <VenueOwnerRegistrationPage />,
  },
  {
    path: "/register",
    element: <UserRegistrationPage />,
  },
  {
    path: "/login",
    element: <UserLoginPage />, // User login page
  },

  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "manage-bookings",
        element: <ManageUserBookings />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
    ],
  },
  {
    path: "/about",
    element: <About />, // Route for About page
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
