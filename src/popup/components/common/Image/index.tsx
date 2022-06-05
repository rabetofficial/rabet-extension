import React, { useState, CSSProperties } from 'react';

type AppProps = {
  src: string;
  fallBack: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

const Image = ({
  src,
  alt,
  fallBack,
  className,
  style,
}: AppProps) => {
  const [source, setSource] = useState(src);

  const handleError = () => {
    setSource(fallBack);
  };

  return (
    <img
      src={source}
      alt={alt}
      style={style}
      className={className}
      onError={handleError}
    />
  );
};

Image.defaultProps = {
  alt: '',
  className: '',
  style: {},
};

export default Image;
