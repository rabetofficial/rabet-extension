import config from '../../config';
import sendInterval from './sendInterval';
import { createWindowAsync } from 'helpers/chromeHelper';

type ScreenMetrics = {
  screenX: number;
  screenY: number;
  outerWidth: number;
};

const createWindowParams = ({
  screenY,
  screenX,
  outerWidth,
}: ScreenMetrics): chrome.windows.CreateData => ({
  type: 'popup',
  url: chrome.runtime.getURL('dist/interaction.html'),
  width: config.WINDOW_WIDTH,
  height: config.WINDOW_HEIGHT,
  top: Math.max(screenY, 0),
  left: Math.max(screenX + (outerWidth - config.WINDOW_WIDTH), 0),
});

export const createWindow = async (metrics: ScreenMetrics, details: any) => {
  const { screenX, screenY, outerWidth } = metrics;

  const window = await createWindowAsync(
    createWindowParams({ screenX, screenY, outerWidth }),
  );

  setTimeout(() => {
    chrome.windows.remove(window.id);
  }, config.WINDOW_TIMEOUT_SECONDS * 1000);

  const generatedId = window.id;

  sendInterval(window.tabs[0].id, {
    generatedId,
    ...details,
  });

  return {
    window,
    generatedId,
  };
};

export const removeWindow = (id: number) => {
  chrome.windows.remove(id);
};
