import { useEffect, useRef, useState } from "react";

interface LazyRenderProps {
  children: React.ReactNode;
  minHeight?: string;
  placeholder?: React.ReactNode;
}

function LazyRender({
  children,
  minHeight = "600px",
  placeholder = null,
}: LazyRenderProps) {
  const sectionRef =
    useRef<HTMLDivElement | null>(null);

  const [hasBeenVisible, setHasBeenVisible] =
    useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasBeenVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "300px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        minHeight: hasBeenVisible
          ? undefined
          : minHeight,
      }}
    >
      {hasBeenVisible ? children : placeholder}
    </div>
  );
}

export default LazyRender;