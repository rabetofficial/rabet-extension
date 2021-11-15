import config from '../../config';

const windowObject = ({ screenY, screenX, outerWidth }) => ({
  type: 'popup',
  url: chrome.runtime.getURL('dist/interaction.html'),
  top: Math.max(screenY, 0),
  left: Math.max(screenX + (outerWidth - config.WINDOW_WIDTH), 0),
  width: config.WINDOW_WIDTH,
  height: config.WINDOW_HEIGHT,
});

export default windowObject;
