import { useState } from 'react';

const Image = ({
  src,
  alt,
  fallBack,
  className,
}) => {
  const [hadError, setHadError] = useState(false);

  const handleError = () => {
    setHadError(true);
  };

  if (hadError) {
    return (
      <img
        src={fallBack}
        alt={alt}
        className={className}
      />
    );
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

export default Image;
