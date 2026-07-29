import { AnimatePresence, motion } from "framer-motion";

function ThemeTransition({ show, theme }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="pointer-events-none fixed right-2 top-2 z-[9999] h-48 w-48 rounded-full blur-3xl sm:right-6 sm:top-6"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 0.35, scale: 1.2 }}
          exit={{ opacity: 0, scale: 1.7 }}
          transition={{
            duration: 1.1,
            ease: "easeInOut",
          }}
          style={{
            background:
              theme === "dark"
                ? "radial-gradient(circle, rgba(129, 140, 248, 0.75), transparent 68%)"
                : "radial-gradient(circle, rgba(251, 191, 36, 0.7), transparent 68%)",
          }}
        />
      )}
    </AnimatePresence>
  );
}

export default ThemeTransition;
