import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  threshold?: number | number[];
  rootMargin?: string;
  root?: Element | null;
  once?: boolean;
}

/**
 * Hook that tracks whether an element is in the viewport
 * @param options IntersectionObserver options and additional configuration
 * @returns [ref, inView] - ref to attach to the element and boolean indicating if element is in view
 */
const useInView = <T extends Element = HTMLDivElement>(
  options: InViewOptions = {}
): [React.RefObject<T | null>, boolean] => {
  const {
    threshold = 0,
    rootMargin = "0px",
    root = null,
    once = false,
  } = options;

  const [inView, setInView] = useState<boolean>(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setInView(true);
          if (once && currentRef) {
            observer.unobserve(currentRef);
          }
        } else if (!once) {
          setInView(false);
        }
      },
      { threshold, rootMargin, root }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, root, once]);

  return [ref, inView];
};

export default useInView;
