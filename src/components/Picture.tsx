import { imageOf, type ImageName } from "@/data/portfolio";

type PictureProps = {
  name: ImageName;
  alt: string;
  sizes: string;
  className?: string;
};

export function Picture({ name, alt, sizes, className }: PictureProps) {
  const { large, small } = imageOf(name);

  return (
    <img
      className={className}
      src={large.src}
      srcSet={small ? `${small.src} ${small.width}w, ${large.src} ${large.width}w` : undefined}
      sizes={small ? sizes : undefined}
      width={large.width}
      height={large.height}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
}
