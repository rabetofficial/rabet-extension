import React, { useState } from 'react';

type AppProps = {
  src: string;
  fallBack: string;
  alt?: string;
  className?: string;
};

const Image = ({ src, alt, fallBack, className }: AppProps) => {
  const [hadError, setHadError] = useState(false);

  const handleError = () => {
    setHadError(true);
  };

  if (hadError) {
    return <img src={fallBack} alt={alt} className={className} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
};

Image.defaultProps = {
  alt: '',
  className: '',
};

export default Image;
