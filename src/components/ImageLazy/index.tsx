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
    once: true,
  });

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

  const copyImage = () => {
    if (imgRef.current) {
      navigator.clipboard.writeText(imgRef.current.src);
    }
  };

  return (
    <div
      className={`relative group overflow-hidden ${containerClassName}`}
      style={{ width, height: !isLoaded ? height : "auto" }}
      ref={containerRef}
    >
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
            style={{
              transition: `opacity 300ms ease-in-out`,
              transitionDelay: `${Math.floor(Math.random() * 200)}ms`,
            }}
            onLoad={handleLoad}
            onError={handleError}
          />
        </picture>
      )}

      <button
        onClick={copyImage}
        className="p-1 opacity-0 pointer-events-none group-hover:pointer-events-auto transition-opacity  group-hover:opacity-100 cursor-pointer text-white  rounded-md bg-black/70 absolute top-2 right-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="#fff"
          viewBox="0 0 256 256"
        >
          <path d="M180,64H40A12,12,0,0,0,28,76V216a12,12,0,0,0,12,12H180a12,12,0,0,0,12-12V76A12,12,0,0,0,180,64ZM168,204H52V88H168ZM228,40V180a12,12,0,0,1-24,0V52H76a12,12,0,0,1,0-24H216A12,12,0,0,1,228,40Z"></path>
        </svg>
      </button>
    </div>
  );
};

export default LazyImage;
