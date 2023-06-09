import { ImageLoaderProps } from "next/image";

export const ImgLoader = ({ src, width, quality }: ImageLoaderProps) => {
  if (width && quality) {
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    return src;
  }
};
