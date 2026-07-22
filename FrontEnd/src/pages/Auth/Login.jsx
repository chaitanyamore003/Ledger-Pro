import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, resendOtp } from "../../services/authApi";
import useAuth from "../../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const [showVerifyButton, setShowVerifyButton] = useState(false);
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:border-indigo-400 dark:focus:bg-slate-950 dark:focus:ring-indigo-500/20";

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    setErrors([]);
    setSuccess("");
    setShowVerifyButton(false);
  };

  const handleVerifyEmail = async () => {
    try {
      setLoading(true);

      await resendOtp(formData.email);

      navigate(`/verify-email?email=${encodeURIComponent(formData.email)}`);
    } catch (error) {
      setErrors([
        error.response?.data?.message || "Unable to send verification email.",
      ]);
    } finally {
      setLoading(false);
    }
  };

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

      login({
        user: data.data.user,
        accessToken: data.data.accessToken,
      });

      navigate("/dashboard");
    } catch (error) {
      setSuccess("");

      const message = error.response?.data?.message || "Something went wrong.";

      setErrors([message]);
      setShowVerifyButton(
        message === "Please verify your email before logging in.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold text-slate-900 dark:text-white">
          Welcome Back
        </h2>

        <div className="mx-auto mt-3 h-1 w-20 rounded-full bg-indigo-600 dark:bg-indigo-400" />

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Sign in to access your Backend Ledger account securely.
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

      {showVerifyButton && (
        <div className="mb-6">
          <button
            type="button"
            onClick={handleVerifyEmail}
            disabled={loading}
            className="w-full rounded-xl border border-indigo-600 bg-indigo-50 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-indigo-400/70 dark:bg-indigo-500/10 dark:text-indigo-200 dark:hover:bg-indigo-500/20"
          >
            {loading ? "Sending Verification Email..." : "Verify Email"}
          </button>
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
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            className={inputClass}
          />
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
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-800">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Don't have an account?
        </p>

        <button
          type="button"
          onClick={() => navigate("/register")}
          className="mt-2 font-semibold text-indigo-600 transition hover:text-indigo-700 hover:underline dark:text-indigo-300 dark:hover:text-indigo-200"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default Login;
