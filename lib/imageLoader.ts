export const ImgLoader = ({ src, width, quality }) => {
  if (width && quality) {
    return `${src}?w=${width}&q=${quality || 75}`;
  } else {
    return src;
  }
};
