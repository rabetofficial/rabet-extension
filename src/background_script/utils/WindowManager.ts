import config from '../../config';

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

class WindowManager {
  static create({
    screenX,
    screenY,
    outerWidth,
  }: ScreenMetrics): Promise<chrome.windows.Window> {
    return new Promise((resolve) => {
      chrome.windows.create(
        createWindowParams({ screenX, screenY, outerWidth }),
        (windowResponse) => {
          this.removeAfterTimeout(windowResponse.id);

          resolve(windowResponse);
        },
      );
    });
  }

  static remove(id: number) {
    chrome.windows.remove(id);
  }

  static removeAfterTimeout(id: number) {
    setTimeout(() => {
      this.remove(id);
    }, config.WINDOW_TIMEOUT_SECONDS * 1000);
  }
}

export default WindowManager;
