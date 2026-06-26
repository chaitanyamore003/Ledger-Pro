import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-6">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-2">
        {/* Left Side */}
        <div className="flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-blue-700 p-12 text-white">
          <h1 className="text-5xl font-bold">Backend Ledger</h1>

          <p className="mt-6 text-lg text-indigo-100">
            Secure authentication built with
            <br />
            MERN Stack + JWT.
          </p>

          <div className="mt-10 space-y-3 text-indigo-100">
            <p>✔ Secure JWT Authentication</p>
            <p>✔ Refresh Token Rotation</p>
            <p>✔ Email Verification</p>
            <p>✔ HTTP Only Cookies</p>
          </div>
        </div>
    
        {/* Right Side */}
        <div className="flex items-center justify-center p-12">
          <div className="w-full max-w-md">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
