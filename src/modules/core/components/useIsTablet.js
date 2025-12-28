import { useState, useEffect } from "react";

export default function useIsTablet(min = 768, max = 1024) {
  const [isTablet, setIsTablet] = useState(
    window.innerWidth >= min && window.innerWidth < max
  );

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth >= min && window.innerWidth < max);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [min, max]);

  return isTablet;
}
