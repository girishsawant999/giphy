import useInView from "@/hooks/useInView";
import React, { useMemo, useRef, useState } from "react";

// Array of placeholder colors
const PLACEHOLDER_COLORS = [
  "#4b5563", // gray-600
  "#dc2626", // red-600
  "#d97706", // amber-600
  "#059669", // emerald-600
  "#0284c7", // sky-600
  "#7c3aed", // violet-600
  "#db2777", // pink-600
];

interface ImageSource {
  srcset: string;
  type: string;
}

interface LazyImageProps {
  src: string;
  alt: string;
  sources?: ImageSource[];
  width?: number | string;
  height?: number | string;
  className?: string;
  containerClassName?: string;
  placeholderColors?: string[];
  threshold?: number;
  loadingClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  sources = [],
  width,
  height,
  className = "",
  containerClassName = "",
  placeholderColors = PLACEHOLDER_COLORS,
  threshold = 0.1,
  loadingClassName = "animate-pulse",
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const [containerRef, isInView] = useInView<HTMLDivElement>({
    threshold,
    once: true, // Only trigger once when the element comes into view
  });

  // Generate a random color from the array on component mount
  const randomColor = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * placeholderColors.length);
    return placeholderColors[randomIndex];
  }, [placeholderColors]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
    onError?.();
  };

  return (
    <div
      className={`relative overflow-hidden ${containerClassName}`}
      style={{ width, height: !isLoaded ? height : "auto" }}
      ref={containerRef}
    >
      {/* Random Color Placeholder */}
      {(!isLoaded || !isInView) && (
        <div
          className={`absolute inset-0 ${loadingClassName}`}
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: randomColor,
          }}
        />
      )}

      {/* Actual Image with Picture Element - Hidden until loaded */}
      {isInView && (
        <picture>
          {sources.map((source, index) => (
            <source
              key={index}
              type={source.type}
              srcSet={error ? "" : source.srcset}
            />
          ))}
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className={`w-full h-full object-cover ${className} ${
              isLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 300ms ease-in-out" }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}
    </div>
  );
};

export default LazyImage;
