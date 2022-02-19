import styled, { css } from 'styled-components';

export const Scroll = styled.div`
  &::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: white;
  }

  &::-webkit-scrollbar {
    width: 0;
  }

  &:hover::-webkit-scrollbar {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    transition: ease-in 0.3s;
  }

  &:hover::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transition: ease-in 0.3s;
  }
`;

export const VerticalScroll = styled(Scroll).attrs(
  (props: { maxHeight: number }) => ({
    maxHeight: props.maxHeight,
  }),
)`
  max-height: ${(props) => props.maxHeight}px;
  overflow-y: auto;
  &:hover::-webkit-scrollbar {
    width: 6px;
  }
`;

export const HorizontalScroll = styled(Scroll).attrs(
  (props: { maxWidth: number }) => ({
    maxWidth: props.maxWidth,
  }),
)`
  max-width: ${(props) => props.maxWidth}px;
  overflow-x: auto;
  &:hover::-webkit-scrollbar {
    height: 6px;
  }
`;

export const HiddenScroll = styled.div.attrs(
  (props: { maxHeight: number; maxWidth: number }) => ({
    maxHeight: props.maxHeight,
    maxWidth: props.maxWidth,
  }),
)`
  ${(props) =>
    props.maxHeight > 0 &&
    css`
      max-height: ${props.maxHeight}px;
      overflow-y: auto;
    `}

  ${(props) =>
    props.maxWidth > 0 &&
    css`
      max-width: ${props.maxWidth}px;
      overflow-x: auto;
    `}
  

  &::-webkit-scrollbar-track,
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;
