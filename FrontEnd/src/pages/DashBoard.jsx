import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/authApi";
import useAuth from "../hooks/useAuth";

function DashBoard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [loading, setLoading] = useState(false);

  // Handle user logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutUser();

      // Clear authentication state
      logout();

      // Redirect to login page
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-800 bg-slate-900 p-10 shadow-2xl">
        <div className="space-y-3 text-center">
          <h1 className="text-4xl font-bold text-white">
            Welcome to Dashboard 👋
          </h1>

          <p className="text-slate-400">You have successfully authenticated.</p>

          {user && (
            <div className="mt-6 rounded-xl bg-slate-800 p-5 text-left">
              <h2 className="mb-3 text-lg font-semibold text-white">
                User Information
              </h2>

              <p className="text-slate-300">
                <span className="font-semibold">Name:</span> {user.name}
              </p>

              <p className="mt-2 text-slate-300">
                <span className="font-semibold">Email:</span> {user.email}
              </p>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-to-r from-red-500 to-red-600 py-3 font-semibold text-white transition-all hover:from-red-600 hover:to-red-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Logging Out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default DashBoard;
