import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authApi";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();

  // Access authentication methods
  const { login } = useAuth();

  // Login form data
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Validation errors
  const [errors, setErrors] = useState([]);

  // Success message
  const [success, setSuccess] = useState("");

  // Submit loading state
  const [loading, setLoading] = useState(false);

  // Update form fields
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    // Clear previous messages
    setErrors([]);
    setSuccess("");
  };

  // Handle login
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = [];

    if (!formData.email.trim()) {
      validationErrors.push("Email is required.");
    }

    if (!formData.password.trim()) {
      validationErrors.push("Password is required.");
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const { data } = await loginUser(formData);

      setSuccess(data.message);
      setErrors([]);

      // Update global authentication state
      login({
        user: data.data.user,
        accessToken: data.data.accessToken,
      });

      // Redirect to dashboard
      navigate("/dashboard");
    } catch (error) {
      setSuccess("");

      setErrors([error.response?.data?.message || "Something went wrong."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900">Welcome Back</h2>

        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-indigo-600"></div>

        <p className="mt-4 text-slate-500">
          Sign in to access your Backend Ledger account securely.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xl">⚠️</span>

            <h3 className="font-semibold text-red-700">
              Please fix the following:
            </h3>
          </div>

          <ul className="list-disc space-y-1 pl-6 text-sm text-red-600">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5">
          <div className="flex items-center gap-2">
            <span className="text-xl">✅</span>

            <p className="font-medium text-green-700">{success}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <svg
                className="mr-2 h-5 w-5 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center">
        <p className="text-sm text-slate-600">Don't have an account?</p>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
