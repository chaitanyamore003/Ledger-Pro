import { useEffect, useState } from "react";

export default function useScrollDirection() {
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      const current = window.scrollY;

      setShowLogo(current <= 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return showLogo;
}
