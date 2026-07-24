"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import styles from "./HeroRipple.module.css";

type Ripple = {
  x: number;
  y: number;
  bornAt: number;
  strength: number;
};

type Props = {
  children: ReactNode;
};

const RIPPLE_LIFETIME_MS = 1350;
const MAX_RIPPLES = 9;
const TRAIL_DISTANCE = 92;

export function HeroRipple({ children }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ripplesRef = useRef<Ripple[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastTrailPointRef = useRef<{ x: number; y: number } | null>(null);
  const reducedMotionRef = useRef(false);
  const visibleRef = useRef(true);

  const draw = useCallback((now: number) => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host || !visibleRef.current) {
      rafRef.current = null;
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      rafRef.current = null;
      return;
    }

    const rect = host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(1, Math.round(rect.width * dpr));
    const height = Math.max(1, Math.round(rect.height * dpr));

    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, rect.width, rect.height);

    const activeRipples = ripplesRef.current.filter(
      (ripple) => now - ripple.bornAt < RIPPLE_LIFETIME_MS,
    );
    ripplesRef.current = activeRipples;

    for (const ripple of activeRipples) {
      const progress = (now - ripple.bornAt) / RIPPLE_LIFETIME_MS;
      const eased = 1 - Math.pow(1 - progress, 3);
      const radius = 24 + eased * Math.max(rect.width, rect.height) * 0.34;
      const alpha = Math.pow(1 - progress, 1.8) * ripple.strength;

      context.save();
      context.globalCompositeOperation = "multiply";

      const gradient = context.createRadialGradient(
        ripple.x,
        ripple.y,
        Math.max(0, radius - 22),
        ripple.x,
        ripple.y,
        radius + 18,
      );
      gradient.addColorStop(0, "rgba(63, 111, 81, 0)");
      gradient.addColorStop(0.43, `rgba(63, 111, 81, ${alpha * 0.12})`);
      gradient.addColorStop(0.5, `rgba(242, 140, 82, ${alpha * 0.22})`);
      gradient.addColorStop(0.57, `rgba(203, 234, 119, ${alpha * 0.16})`);
      gradient.addColorStop(1, "rgba(63, 111, 81, 0)");

      context.strokeStyle = gradient;
      context.lineWidth = 12 + 10 * (1 - progress);
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius, 0, Math.PI * 2);
      context.stroke();

      context.globalCompositeOperation = "screen";
      context.strokeStyle = `rgba(255, 250, 240, ${alpha * 0.62})`;
      context.lineWidth = 1.5;
      context.beginPath();
      context.arc(ripple.x, ripple.y, radius - 5, 0, Math.PI * 2);
      context.stroke();
      context.restore();
    }

    if (activeRipples.length > 0) {
      rafRef.current = window.requestAnimationFrame(draw);
    } else {
      rafRef.current = null;
    }
  }, []);

  const wake = useCallback(() => {
    if (rafRef.current === null && !reducedMotionRef.current) {
      rafRef.current = window.requestAnimationFrame(draw);
    }
  }, [draw]);

  const splash = useCallback(
    (x: number, y: number, strength: number) => {
      if (reducedMotionRef.current) return;
      if (ripplesRef.current.length >= MAX_RIPPLES) {
        ripplesRef.current.shift();
      }
      ripplesRef.current.push({ x, y, bornAt: performance.now(), strength });
      wake();
    },
    [wake],
  );

  function localPoint(event: ReactPointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;
    const point = localPoint(event);
    const previous = lastTrailPointRef.current;

    if (
      !previous ||
      Math.hypot(point.x - previous.x, point.y - previous.y) >= TRAIL_DISTANCE
    ) {
      lastTrailPointRef.current = point;
      splash(point.x, point.y, 0.42);
    }
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    const point = localPoint(event);
    splash(point.x, point.y, 0.95);
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      reducedMotionRef.current = media.matches;
      if (media.matches) {
        ripplesRef.current = [];
        if (rafRef.current !== null) {
          window.cancelAnimationFrame(rafRef.current);
          rafRef.current = null;
        }
        const canvas = canvasRef.current;
        canvas?.getContext("2d")?.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    updateMotionPreference();
    media.addEventListener("change", updateMotionPreference);

    const host = hostRef.current;
    const observer = host
      ? new IntersectionObserver(([entry]) => {
          visibleRef.current = entry?.isIntersecting ?? true;
          if (visibleRef.current && ripplesRef.current.length > 0) wake();
        })
      : null;

    if (host && observer) observer.observe(host);

    return () => {
      media.removeEventListener("change", updateMotionPreference);
      observer?.disconnect();
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [wake]);

  return (
    <div
      ref={hostRef}
      className={styles.root}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </div>
  );
}
