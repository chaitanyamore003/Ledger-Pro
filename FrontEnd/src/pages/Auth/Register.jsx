import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authApi";
import useAuth from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();

  // Access authentication methods
  const { login } = useAuth();

  // Validation errors
  const [errors, setErrors] = useState([]);

  // Success message
  const [success, setSuccess] = useState("");

  // Submit loading state
  const [loading, setLoading] = useState(false);

  // Registration form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Update form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear previous messages
    if (errors.length) setErrors([]);
    if (success) setSuccess("");
  };

  // Handle registration
  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors([]);
    setSuccess("");

    const validationErrors = [];

    if (!formData.name.trim()) {
      validationErrors.push("Full name is required.");
    }

    if (!formData.email.trim()) {
      validationErrors.push("Email is required.");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.push("Please enter a valid email address.");
    }

    if (!formData.password) {
      validationErrors.push("Password is required.");
    } else if (formData.password.length < 6) {
      validationErrors.push("Password must be at least 6 characters.");
    }

    if (validationErrors.length) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);

      const { data } = await registerUser(formData);

      setSuccess(data.message);

      // Update global authentication state
      login({
        user: data.data.user,
        accessToken: data.data.accessToken,
      });

      // Clear form
      setFormData({
        name: "",
        email: "",
        password: "",
      });

      // Redirect to dashboard
      navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      setErrors([error.response?.data?.message || "Something went wrong."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900">
          Create your account
        </h2>

        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-indigo-600"></div>

        <p className="mt-4 text-slate-500">
          Join Backend Ledger and manage your account securely.
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
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
            />
          </div>

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
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
          />

          <p className="mt-2 text-xs text-slate-500">
            Password must contain at least 6 characters.
          </p>
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
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center">
        <p className="text-sm text-slate-600">Already have an account?</p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Register;
