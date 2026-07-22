import { Home, OctagonX } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

function Page404() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 px-6 transition-colors dark:bg-gradient-to-br dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900">
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-2xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/30">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-300">
          <OctagonX size={44} />
        </div>

        <h1 className="mt-8 text-7xl font-extrabold tracking-tight text-indigo-600 dark:text-indigo-300">
          404
        </h1>

        <h2 className="mt-4 text-3xl font-bold text-slate-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Sorry, the page you're looking for doesn't exist or may have been
          moved.
        </p>

        <Link
          to="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl dark:bg-indigo-500 dark:hover:bg-indigo-400"
        >
          <Home size={20} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Page404;
