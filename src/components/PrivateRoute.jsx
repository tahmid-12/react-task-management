import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom"; 
import Navbar from './Navbar'; // Import your Navbar component

const PrivateRoute = () => {
  const { token } = useSelector((state) => state.auth); // Get authentication status from Redux

  return token ? (
    <>
      <Navbar /> {/* Show Navbar only after authentication */}
      <Outlet /> {/* Render the child routes (protected routes) */}
    </>
  ) : (
    <Navigate to="/" replace /> // Redirect to login page if not authenticated
  );
};

export default PrivateRoute;