import { useInView } from "motion/react";
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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isSharing, setIsSharing] = useState(false);

  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
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

  const onShareImage = async () => {
    if (imgRef.current) {
      try {
        setIsSharing(true);
        const blob = await fetch(imgRef.current.src).then((res) => res.blob());
        const file = new File([blob], `${alt}.gif`, { type: blob.type });
        if (
          navigator.canShare &&
          navigator.canShare({ files: [file] }) &&
          navigator.share
        ) {
          await navigator.share({
            title: alt,
            text: alt,
            files: [file],
          });
        } else {
          alert("Sharing is not supported on this device/browser.");
        }
      } catch (err) {
        console.error("Error sharing image:", err);
      } finally {
        setIsSharing(false);
      }
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
        onClick={onShareImage}
        disabled={isSharing}
        className="p-1 opacity-0 pointer-events-none group-active:pointer-events-auto  group-hover:pointer-events-auto transition-opacity group-active:opacity-100  group-hover:opacity-100 cursor-pointer text-white  rounded-md bg-black/70 absolute top-2 right-2"
      >
        {isSharing ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
            className="animate-spin"
          >
            <path d="M136,32V64a8,8,0,0,1-16,0V32a8,8,0,0,1,16,0Zm37.25,58.75a8,8,0,0,0,5.66-2.35l22.63-22.62a8,8,0,0,0-11.32-11.32L167.6,77.09a8,8,0,0,0,5.65,13.66ZM224,120H192a8,8,0,0,0,0,16h32a8,8,0,0,0,0-16Zm-45.09,47.6a8,8,0,0,0-11.31,11.31l22.62,22.63a8,8,0,0,0,11.32-11.32ZM128,184a8,8,0,0,0-8,8v32a8,8,0,0,0,16,0V192A8,8,0,0,0,128,184ZM77.09,167.6,54.46,190.22a8,8,0,0,0,11.32,11.32L88.4,178.91A8,8,0,0,0,77.09,167.6ZM72,128a8,8,0,0,0-8-8H32a8,8,0,0,0,0,16H64A8,8,0,0,0,72,128ZM65.78,54.46A8,8,0,0,0,54.46,65.78L77.09,88.4A8,8,0,0,0,88.4,77.09Z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 256 256"
          >
            <path d="M216,112v96a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V112A16,16,0,0,1,56,96H80a8,8,0,0,1,0,16H56v96H200V112H176a8,8,0,0,1,0-16h24A16,16,0,0,1,216,112ZM93.66,69.66,120,43.31V136a8,8,0,0,0,16,0V43.31l26.34,26.35a8,8,0,0,0,11.32-11.32l-40-40a8,8,0,0,0-11.32,0l-40,40A8,8,0,0,0,93.66,69.66Z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default LazyImage;
