import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import ThemeContext from "./ThemeContextValue";

const applyThemeToDocument = (theme) => {
  const root = document.documentElement;

  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  localStorage.setItem("theme", theme);
};

const getTransitionOrigin = (event) => {
  const rect = event?.currentTarget?.getBoundingClientRect();

  if (!rect) {
    return {
      x: window.innerWidth - 40,
      y: 40,
    };
  }

  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
};

const setTransitionOrigin = ({ x, y }) => {
  const root = document.documentElement;
  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  );

  root.style.setProperty("--theme-toggle-x", `${x}px`);
  root.style.setProperty("--theme-toggle-y", `${y}px`);
  root.style.setProperty("--theme-toggle-radius", `${radius}px`);
};

const clearTransitionOrigin = () => {
  const root = document.documentElement;

  root.style.removeProperty("--theme-toggle-x");
  root.style.removeProperty("--theme-toggle-y");
  root.style.removeProperty("--theme-toggle-radius");
};

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) return savedTheme;

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const toggleTheme = (event) => {
    if (isTransitioning) return;

    const root = document.documentElement;
    const nextTheme = theme === "light" ? "dark" : "light";
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    setTransitionOrigin(getTransitionOrigin(event));
    setIsTransitioning(true);

    if (!document.startViewTransition || prefersReducedMotion) {
      root.classList.add("theme-changing");
      setTheme(nextTheme);

      setTimeout(() => {
        root.classList.remove("theme-changing");
        clearTransitionOrigin();
        setIsTransitioning(false);
      }, 760);

      return;
    }

    root.classList.add("theme-radial-transition");

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(nextTheme);
      });

      applyThemeToDocument(nextTheme);
    });

    transition.finished.finally(() => {
      root.classList.remove("theme-radial-transition");
      clearTransitionOrigin();
      setIsTransitioning(false);
    });
  };

  const value = {
    theme,
    toggleTheme,
    isTransitioning,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
