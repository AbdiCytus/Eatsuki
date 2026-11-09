"use client";

/**
 * ScrollAnimationWrapper
 *
 * A lightweight Client Component that uses the native Intersection Observer API
 * to trigger a fade-in + slide-up animation when the wrapped element enters the viewport.
 * No external library needed — keeps the bundle lean.
 *
 * Usage:
 *   <ScrollAnimationWrapper>
 *     <YourComponent />
 *   </ScrollAnimationWrapper>
 *
 * Props:
 *   - children   : React nodes to animate
 *   - className  : Extra CSS classes for the wrapper div
 *   - delay      : Animation delay in milliseconds (default: 0)
 *   - direction  : Slide direction — "up" | "left" | "right" (default: "up")
 */

import { useEffect, useRef, useState } from "react";

type AnimationDirection = "up" | "left" | "right";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: AnimationDirection;
}

// Map each direction to its initial translate transform
const directionMap: Record<AnimationDirection, string> = {
  up: "translateY(40px)",
  left: "translateX(-40px)",
  right: "translateX(40px)",
};

export default function ScrollAnimationWrapper({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollAnimationWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Unobserve after first trigger — animate only once
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : directionMap[direction],
        transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
