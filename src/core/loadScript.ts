/*
 * By-Health Front-end Team (https://www.by-health.com/)
 *
 * Copyright © 2016-present By-Health Co Ltd. All rights reserved.
 */
const cachedScripts: {
  [url: string]: Promise<void>;
} = {};

/**
 * Load JS scripts.
 * @param url
 */
function loadScript(url: string) {
  if (cachedScripts[url]) {
    return cachedScripts[url];
  }

  cachedScripts[url] = new Promise<void>((resolve, reject) => {
    const node = document.createElement('script');
    node.type = 'text/javascript';
    node.async = true;
    node.src = url;
    node.addEventListener('load', () => resolve(), false);
    node.addEventListener(
      'error',
      () => {
        document.head.removeChild(node);
        delete cachedScripts[url];
        reject();
      },
      false,
    );
    document.head.appendChild(node);
  });

  return cachedScripts[url];
}

export default loadScript;
