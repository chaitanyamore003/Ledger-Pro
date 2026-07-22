import { Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

function ThemeToggle() {
  const { theme, toggleTheme, isTransitioning } = useTheme();

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.9 }}
      animate={{ rotate: theme === "dark" ? 180 : 0 }}
      transition={{ duration: 0.7 }}
      onClick={(event) => toggleTheme(event)}
      disabled={isTransitioning}
      className="
        flex h-10 w-10 items-center justify-center
        rounded-xl border border-slate-300
        bg-white/70
        text-slate-700
        transition
        hover:bg-white
        disabled:cursor-not-allowed disabled:opacity-70
        dark:border-slate-700
        dark:bg-slate-900/70
        dark:text-slate-200
        dark:hover:bg-slate-800
      "
      aria-label="Toggle dark mode"
      aria-pressed={theme === "dark"}
    >
      {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
    </motion.button>
  );
}

export default ThemeToggle;
