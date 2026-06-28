import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-950 px-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-10 shadow-2xl">
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-slate-900">
            Backend Ledger
          </h1>

          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-indigo-600"></div>

          <p className="mt-6 text-lg text-slate-600">
            A secure and modern Bank Ledger Management System built with the
            MERN Stack, featuring JWT Authentication, Refresh Tokens, Protected
            Routes, and Enterprise-grade architecture.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
          >
            📊 Dashboard
          </button>

          <button
            onClick={() => navigate("/login")}
            className="rounded-xl border border-indigo-600 bg-white px-6 py-4 font-semibold text-indigo-600 transition-all duration-300 hover:bg-indigo-50"
          >
            🔐 Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="rounded-xl bg-emerald-600 px-6 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-700 hover:shadow-xl"
          >
            ✨ Register
          </button>
        </div>

        <div className="mt-12 rounded-2xl bg-slate-100 p-6">
          <h2 className="mb-4 text-xl font-bold text-slate-800">
            Features Included
          </h2>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg bg-white p-4 shadow-sm">
              ✅ JWT Authentication
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              🔄 Refresh Token Rotation
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              🔒 Protected Routes
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              ⚡ React Context Authentication
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              📡 Axios Interceptors
            </div>

            <div className="rounded-lg bg-white p-4 shadow-sm">
              💾 MongoDB Database
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
