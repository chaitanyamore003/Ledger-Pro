import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Security", href: "#security" },
  { name: "Technology", href: "#technology" },
  { name: "About", href: "#about" },
];

function NavBar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 pt-8">
        {/* Brand */}

        <Link to="/" className="select-none">
          <h1 className="font-brand text-7xl leading-none tracking-tight text-black transition duration-300 hover:opacity-80 dark:text-white">
            LEDGER PRO
          </h1>
        </Link>

        {/* Floating Navigation */}

        <div className="hidden items-center rounded-full border border-black/10 bg-white px-3 py-2 shadow-sm lg:flex dark:border-white/10 dark:bg-black">
          <nav className="flex items-center gap-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="rounded-full px-5 py-2 text-sm font-medium text-black transition-all duration-300 hover:bg-[#FFBA7D] hover:text-black dark:text-white dark:hover:bg-[#FFBA7D] dark:hover:text-black"
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="mx-4 h-5 w-px bg-black/10 dark:bg-white/10" />

          <ThemeToggle />

          <Link
            to="/login"
            className="rounded-full px-5 py-2 text-sm font-medium text-black transition hover:text-[#FFBA7D] dark:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="group ml-2 inline-flex items-center gap-2 rounded-full bg-[#FFBA7D] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
          >
            Get Started
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
