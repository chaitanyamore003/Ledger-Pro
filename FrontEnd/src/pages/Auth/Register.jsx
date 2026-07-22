import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authApi";
import useAuth from "../../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950 dark:focus:ring-indigo-500/20";

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors.length) setErrors([]);
    if (success) setSuccess("");
  };

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

      login({
        user: data.data.user,
        accessToken: data.data.accessToken,
      });

      setFormData({
        name: "",
        email: "",
        password: "",
      });

      navigate(`/verify-email?email=${encodeURIComponent(data.data.email)}`);
    } catch (error) {
      setErrors([error.response?.data?.message || "Something went wrong."]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Create your account
        </h2>

        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-indigo-600 dark:bg-indigo-400" />

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Join Backend Ledger and manage your account securely.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/70 dark:bg-red-950/40">
          <div className="mb-3 flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              !
            </span>

            <h3 className="font-semibold text-red-700 dark:text-red-300">
              Please fix the following:
            </h3>
          </div>

          <ul className="list-disc space-y-1 pl-6 text-sm text-red-600 dark:text-red-200">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-5 dark:border-green-900/70 dark:bg-green-950/40">
          <div className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700 dark:bg-green-500/10 dark:text-green-300">
              OK
            </span>

            <p className="font-medium text-green-700 dark:text-green-300">
              {success}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Full Name
            </label>

            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
              Email Address
            </label>

            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700 dark:text-slate-200">
            Password
          </label>

          <input
            type="password"
            name="password"
            placeholder="Minimum 6 characters"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            Password must contain at least 6 characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 py-3 font-semibold text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:from-indigo-500 dark:to-indigo-600"
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

      <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Already have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          Sign In
        </button>
      </div>
    </div>
  );
}

export default Register;
