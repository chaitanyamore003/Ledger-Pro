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
      {/* Heading */}

      <div className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#FFBA7D]">
          Create Account
        </p>

        <h2 className="mt-4 text-4xl font-bold tracking-tight text-black dark:text-white">
          Join LedgerPro.
        </h2>

        <p className="mt-4 max-w-md leading-7 text-neutral-600 dark:text-neutral-400">
          Create your secure account and start managing your finances with a
          modern banking platform.
        </p>
      </div>

      {/* Error */}

      {errors.length > 0 && (
        <div className="mb-8 rounded-2xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
          <p className="mb-2 font-semibold text-red-600">
            Please fix the following:
          </p>

          <ul className="list-disc space-y-1 pl-5 text-sm text-red-500">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Success */}

      {success && (
        <div className="mb-8 rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-900/40 dark:bg-green-950/30">
          <p className="font-medium text-green-700 dark:text-green-300">
            {success}
          </p>
        </div>
      )}

      {/* Form */}

      <form onSubmit={handleSubmit} className="space-y-7">
        <div>
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
          <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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

          <p className="mt-3 text-sm text-neutral-500 dark:text-neutral-400">
            Must contain at least 6 characters.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#FFBA7D] text-lg font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
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

      {/* Footer */}

      <div className="mt-10 border-t border-black/10 pt-8 text-center dark:border-white/10">
        <span className="text-neutral-600 dark:text-neutral-400">
          Already have an account?
        </span>

        <Link
          to="/login"
          className="ml-2 font-semibold text-[#FFBA7D] transition hover:opacity-80"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}

export default Register;
