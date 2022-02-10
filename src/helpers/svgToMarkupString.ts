import { renderToStaticMarkup } from 'react-dom/server';
import { createElement, FC } from 'react';

type ComponentProps = {
  [x: string]: any;
};

const svgToMarkupString = (Component: FC, props: ComponentProps) =>
  `data:image/svg+xml,${encodeURIComponent(
    renderToStaticMarkup(createElement(Component, props)),
  )}`;

export default svgToMarkupString;
