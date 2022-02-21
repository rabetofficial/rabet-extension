import React from 'react';

const ImageOnErrorHandler = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  src: string,
) => {
  const target = event.target as HTMLImageElement;
  target.src = `${src}`;
};

export default ImageOnErrorHandler;
