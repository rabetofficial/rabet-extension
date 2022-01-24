import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`

  html, body, div[class^="pure"], div[class^="pure-u"] {
    font-family: 'Roboto', sans-serif !important;
  }

  html, body {
    background: aliceblue;
    line-height: normal;
  }

  body {
    margin: 0;
  }

  .layout {
    width: 100%;
    min-width: 360px;
    min-height: 600px;
    overflow: hidden;
    padding: 0;
    margin-right: auto;
    margin-left: auto;
    background: white;
    position: relative;
  }

  .content {
    padding-right: 16px;
    padding-left: 16px;
  }

  .content-scroll {
    max-height: calc(600px - (48px + 32px + 16px));
    height: calc(600px - (48px + 32px + 16px));
    overflow-y: auto;
    overflow-x: hidden;
  }

  .scroll::-webkit-scrollbar-track {
    border-radius: 15px;
    background-color: white;
  }

  .scroll::-webkit-scrollbar {
    width: 0;
  }

  .scroll:hover::-webkit-scrollbar {
    width: 6px;
    background-color: white;
  }

  .scroll::-webkit-scrollbar-thumb {
    transition: ease-in 0.3s;
  }

  .scroll:hover::-webkit-scrollbar-thumb {
    border-radius: 13px;
    background-color: ${({ theme }) => theme.colors.primary.dark};
    transition: ease-in 0.3s;
  }

  .hidden-scroll::-webkit-scrollbar-track,
  .hidden-scroll::-webkit-scrollbar {
    width: 0;
  }

  .pure-g {
    letter-spacing: inherit;
  }

  .flex-parent {
    display: flex;
    justify-content: center;
  }

  .h-100 {
    height: 100%;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .overlay {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.12);
  }

  a {
    text-decoration: inherit;
  }

  .hide-blur {
    -webkit-filter: blur(4px);
    -moz-filter: blur(4px);
    -o-filter: blur(4px);
    -ms-filter: blur(4px);
    filter: blur(3px);
    opacity: 0.7;
  }

  .hide-blur:hover {
    -webkit-filter: blur(0);
    -moz-filter: blur(0);
    -o-filter: blur(0);
    -ms-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
`;

export default GlobalStyle;
