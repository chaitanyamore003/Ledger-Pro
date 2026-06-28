import { Home } from "lucide-react";
import { Link } from "react-router-dom";

function Page404() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 px-6">
      <div className="w-full max-w-xl rounded-3xl bg-white p-10 text-center shadow-2xl">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
          <span className="text-5xl">🚫</span>
        </div>

        <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-indigo-600">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Page404;
