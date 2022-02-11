import useDetectSize from 'popup/hooks/useDetectSize';

type DetectSizeProps = {
  desktop: JSX.Element;
  children: JSX.Element;
};

const DetectSize = ({
  children,
  desktop: Desktop,
}: DetectSizeProps) => {
  const size = useDetectSize();

  if (size === 'desktop') {
    return Desktop;
  }

  return children;
};

export default DetectSize;
