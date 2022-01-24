import { createGlobalStyle } from 'styled-components';

const FontStyle = createGlobalStyle`
  @font-face {
    font-family: 'icomoon';
    src: url('/src/assets/fonts/icon/icomoon.eot?neq42k');
    src: url('/src/assets/fonts/icon/icomoon.eot?neq42k#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/icon/icomoon.ttf?neq42k') format('truetype'),
    url('/src/assets/fonts/icon/icomoon.woff?neq42k') format('woff'),
    url('/src/assets/fonts/icon/icomoon.svg?neq42k#icomoon') format('svg');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  [class^="icon-"], [class*=" icon-"] {
    font-family: 'icomoon' !important;
    speak: never;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-invisible:before {
    content: "\\e918";
  }

  .icon-double-arrow-up:before {
    content: "\\e917";
  }

  .icon-lock-2:before {
    content: "\\e914";
  }

  .icon-search:before {
    content: "\\e915";
  }

  .icon-settings-2:before {
    content: "\\e916";
  }

  .icon-flag:before {
    content: "\\e913";
  }

  .icon-question-mark:before {
    content: "\\e912";
  }

  .icon-exclamation-triangle:before {
    content: "\\e911";
  }

  .icon-checkmark:before {
    content: "\\e910";
  }

  .icon-plus-math:before {
    content: "\\e90f";
  }

  .icon-long-arrow-right:before {
    content: "\\e90e";
  }

  .icon-expand-more:before {
    content: "\\e90d";
  }

  .icon-arrow-down:before {
    content: "\\e900";
  }

  .icon-caret-up:before {
    content: "\\e901";
  }

  .icon-edit:before {
    content: "\\e902";
  }

  .icon-exchange-alt:before {
    content: "\\e903";
  }

  .icon-exclamation-circle:before {
    content: "\\e904";
  }

  .icon-file:before {
    content: "\\e905";
  }

  .icon-key:before {
    content: "\\e906";
  }

  .icon-lock:before {
    content: "\\e907";
  }

  .icon-multiply:before {
    content: "\\e908";
  }

  .icon-setting:before {
    content: "\\e909";
  }

  .icon-sheet:before {
    content: "\\e90a";
  }

  .icon-trash:before {
    content: "\\e90b";
  }

  .icon-visible-eye:before {
    content: "\\e90c";
  }

  /* 100 */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 100;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-100.eot');
    src: local('Roboto Thin'), local('Roboto-Thin'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100.svg#Roboto') format('svg');
  }

  /* 100italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 100;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.eot');
    src: local('Roboto Thin Italic'), local('Roboto-ThinItalic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-100italic.svg#Roboto') format('svg');
  }

  /* 300italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 300;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.eot');
    src: local('Roboto Light Italic'), local('Roboto-LightItalic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300italic.svg#Roboto') format('svg');
  }

  /* 300 */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 300;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-300.eot');
    src: local('Roboto Light'), local('Roboto-Light'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-300.svg#Roboto') format('svg');
  }

  /* regular */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.eot');
    src: local('Roboto'), local('Roboto-Regular'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-regular.svg#Roboto') format('svg');
  }

  /* italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 400;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.eot');
    src: local('Roboto Italic'), local('Roboto-Italic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-italic.svg#Roboto') format('svg');
  }

  /* 500 */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-500.eot');
    src: local('Roboto Medium'), local('Roboto-Medium'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500.svg#Roboto') format('svg');
  }

  /* 500italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 500;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.eot');
    src: local('Roboto Medium Italic'), local('Roboto-MediumItalic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-500italic.svg#Roboto') format('svg');
  }

  /* 700 */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-700.eot');
    src: local('Roboto Bold'), local('Roboto-Bold'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700.svg#Roboto') format('svg');
  }

  /* 700italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 700;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.eot');
    src: local('Roboto Bold Italic'), local('Roboto-BoldItalic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-700italic.svg#Roboto') format('svg');
  }

  /* 900 */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 900;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-900.eot');
    src: local('Roboto Black'), local('Roboto-Black'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900.svg#Roboto') format('svg');
  }

  /* 900italic */
  @font-face {
    font-family: 'Roboto';
    font-style: italic;
    font-weight: 900;
    src: url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.eot');
    src: local('Roboto Black Italic'), local('Roboto-BlackItalic'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.eot?#iefix') format('embedded-opentype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.woff2') format('woff2'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.woff') format('woff'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.ttf') format('truetype'),
    url('/src/assets/fonts/Roboto/roboto-v20-latin-900italic.svg#Roboto') format('svg');
  }
`;

export default FontStyle;
