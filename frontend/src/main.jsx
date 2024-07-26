import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
// import Navbar from './component/Navbar.jsx';
import HomePage from './pages/Homepage.jsx';
import ExplorePage from './pages/Explore.jsx';
import BookNowPage from './pages/Booknow.jsx';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './component/Dashboard';
import VenueList from './component/VenueList';
import AddVenue from './component/AddVenue';
import ManageBookings from './component/ManageBookings';
import ManagePlayers from './component/ManagePlayers';
import LoginPage from './pages/Adminlogin.jsx';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
 {
  path: "/explore",
  element: <ExplorePage />
 },
 {
  path: "/explore/:slog",
  element: <BookNowPage />
 },
 {
  path: "/admin",
  element: <AdminDashboard />,
  children: [
    { path: "", element: <Dashboard /> },
    { path: "venues", element: <VenueList /> },
    { path: "venues/add", element: <AddVenue /> },
    { path: "bookings", element: <ManageBookings /> },
    { path: "players", element: <ManagePlayers /> },
  ],
},
{ 
  path: "/admin/login",element: <LoginPage />},
]);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />

  </React.StrictMode>,
)
