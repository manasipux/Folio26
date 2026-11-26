import { useEffect, useRef, useState } from 'react';
import type { Img } from '../../content';
import LazyImage, { withBase } from '../common/LazyImage';

/**
 * An image, or a short screen recording (.mp4/.webm) that plays like a GIF:
 * muted, looping, inline, and only while on screen. With reduced motion it
 * doesn't autoplay and shows controls instead.
 */
export default function Media({
  image,
  onProgress,
  onEnded,
  active,
}: {
  image: Img;
  /** Called with 0–1 as a video plays. */
  onProgress?: (p: number) => void;
  /** When given, the video plays once (no loop) and this is called at the end. */
  onEnded?: () => void;
  /** In a carousel: restart from the beginning each time the slide becomes active. */
  active?: boolean;
}) {
  const isVideo = /\.(mp4|webm)$/i.test(image.src);
  const ref = useRef<HTMLVideoElement>(null);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    if (!isVideo) return;
    const r = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setReduce(r);
    const v = ref.current;
    if (!v || r || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [isVideo]);

  useEffect(() => {
    const v = ref.current;
    if (!v || active === undefined) return;
    if (active) {
      v.currentTime = 0;
      if (!reduce) v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [active, reduce]);

  if (!isVideo) {
    return <LazyImage {...image} width={image.width ?? 1200} height={image.height ?? 800} />;
  }
  return (
    <video
      ref={ref}
      src={withBase(image.src)}
      aria-label={image.alt}
      width={image.width}
      height={image.height}
      muted
      loop={!onEnded}
      playsInline
      preload="metadata"
      controls={reduce}
      onEnded={onEnded}
      onTimeUpdate={(e) => {
        const v = e.currentTarget;
        if (onProgress && v.duration) onProgress(v.currentTime / v.duration);
      }}
    />
  );
}
