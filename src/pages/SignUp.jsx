import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from '../store/features/authSlice';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");
      return;
    }

    if (!agreeTerms) {
      setPasswordError("You must agree to the terms and conditions.");
      return;
    }

    // Dispatch register action with password confirmation
    dispatch(register({ name, email, password, password_confirmation: confirmPassword }))
      .unwrap()
      .then(() => {
        // After successful registration, navigate to tasks or dashboard
        navigate("/tasks");
      })
      .catch((err) => {
        if (err.errors) {
          // Display validation errors returned by the API
          setPasswordError(err.errors.password ? err.errors.password[0] : '');
        } else {
          console.error("Registration failed:", err);
        }
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg space-y-6"
      >
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>

        {error && <p className="text-red-500">{error}</p>}
        
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
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
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError("");
          }}
          placeholder="Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {passwordError && <p className="text-red-500">{passwordError}</p>}
        
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setPasswordError(""); 
          }}
          placeholder="Confirm Password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
        >
          {status === "loading" ? "Signing Up..." : "Sign Up"}
        </button>

        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
         
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <span className="text-gray-700">I agree to the terms and conditions</span>
          </label>

          <Link to="/" className="text-blue-500 hover:underline whitespace-nowrap">
            Already have an account? Log In
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;