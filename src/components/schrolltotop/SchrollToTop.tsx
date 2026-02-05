import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = () => {
  // Current URL-er path track korar jonno useLocation
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Jokhon-i pathname change hobe, tokhon-i window scroll hobe
    // 2. behavior: "instant" dile user bujhte-o parbe na
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null; // Eta kichu render korbe na, shudhu logic handle korbe
};

export default ScrollToTop;
