import type { Img } from '../../content';

type Props = Img & {
  className?: string;
  /** Set true for the one above-the-fold image on a page. */
  eager?: boolean;
  width?: number;
  height?: number;
};

/** <img> with lazy loading + async decoding by default. */
export default function LazyImage({ src, alt, className, eager, width, height }: Props) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}
