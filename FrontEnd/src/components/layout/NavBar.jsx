import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ui/ThemeToggle";
import useScrollDirection from "../../hooks/useScrollDirection";
import { useTheme } from "../../hooks/useTheme";
import useAuth from "../../hooks/useAuth";

const navigation = [
  { name: "Features", href: "#features" },
  { name: "Security", href: "#security" },
  { name: "Technology", href: "#technology" },
  { name: "About", href: "#about" },
];

function NavBar() {
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();

  const showLogo = useScrollDirection();

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 pt-8">
        <AnimatePresence>
          {showLogo && (
            <motion.div
              className="fixed top-6 left-6 z-50"
              initial={{ opacity: 0, x: -40, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -40, scale: 0.9 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              <Link
                to="/"
                className="inline-flex items-center transition-opacity duration-300 hover:opacity-80"
              >
                <img
                  src={
                    theme === "dark"
                      ? "/ledger-pro-logo-no-background-white.png"
                      : "/ledger-pro-logo-no-background.png"
                  }
                  alt="Ledger Pro Logo"
                  className="h-65 w-auto object-contain"
                  draggable={false}
                />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Navigation */}

        <div className="fixed top-6 right-6 z-50 hidden items-center rounded-full border border-black/10 bg-white/90 px-3 py-2 shadow-xl backdrop-blur-xl lg:flex dark:border-white/10 dark:bg-black/90">
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
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="rounded-full px-5 py-2 text-sm font-medium text-black transition-colors duration-300 hover:text-[#FFBA7D] dark:text-white"
          >
            {isAuthenticated ? "Dashboard" : "Login"}
          </Link>

          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="rounded-full bg-[#FFBA7D] px-6 py-3 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
