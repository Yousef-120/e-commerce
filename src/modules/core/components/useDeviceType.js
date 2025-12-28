import { useState, useEffect } from "react";

export default function useDeviceType() {
  const getDeviceType = () => {
    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width >= 768 && width < 1024) return "tablet";
    return "desktop";
  };

  const [device, setDevice] = useState(getDeviceType());

  useEffect(() => {
    const handleResize = () => setDevice(getDeviceType());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device;
}
