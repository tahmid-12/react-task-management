import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/features/authSlice';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"; // Import useNavigate hook

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const { loading, error, token } = useSelector((state) => state.auth); // Get token from state

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password, rememberMe });
    dispatch(login({ email, password }));
  };

  // Use effect to navigate to /tasks after successful login
  useEffect(() => {
    if (token) {
      navigate("/tasks");
    }
  }, [token, navigate]); // Trigger navigation when token changes

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Log In</h2>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center sm:space-x-4">

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">Remember Me</span>
          </label>

          <Link to="/signup" className="text-blue-500 hover:underline mt-4 sm:mt-0">
            Don’t have an account? Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LogIn;