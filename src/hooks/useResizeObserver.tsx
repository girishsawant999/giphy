import { useEffect, useRef, useState } from "react";

const useResizeObserver = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });
      }
    });

    resizeObserver.observe(element);

    return () => {
      if (element) resizeObserver.unobserve(element);
      resizeObserver.disconnect();
    };
  }, []);

  return { ref, dimensions };
};

export default useResizeObserver;
