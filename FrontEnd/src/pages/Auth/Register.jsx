import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 shadow-sm transition placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950/60 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20";

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
    <div className="w-full">
      <div className="mb-8">
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">
          New workspace
        </p>

        <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Create your account
        </h2>

        <p className="mt-3 leading-7 text-slate-500 dark:text-slate-400">
          Start with secure access to LedgerFlow's banking tools.
        </p>
      </div>

      {errors.length > 0 && (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50/80 p-4 dark:border-red-900/70 dark:bg-red-950/40">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-sm font-bold text-red-700 dark:bg-red-500/10 dark:text-red-300">
              !
            </span>

            <div>
              <h3 className="font-semibold text-red-700 dark:text-red-300">
                Please fix the following:
              </h3>

              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-200">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 dark:border-emerald-900/70 dark:bg-emerald-950/40">
          <p className="font-medium text-emerald-700 dark:text-emerald-300">
            {success}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-700 px-4 py-3 font-semibold text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          {loading ? (
            <>
              <svg
                className="h-5 w-5 animate-spin"
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
            <>
              Create Account
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center text-sm dark:border-slate-800">
        <span className="text-slate-600 dark:text-slate-400">
          Already have an account?
        </span>{" "}
        <Link
          to="/login"
          className="font-semibold text-indigo-700 transition hover:text-indigo-800 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
