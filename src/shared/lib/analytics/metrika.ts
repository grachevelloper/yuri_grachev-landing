import { analyticsCounterId } from '../../config/analytics';

type Metrika = ((...args: unknown[]) => void) & {
  a?: unknown[][];
  l?: number;
};

declare global {
  interface Window {
    ym?: Metrika;
  }
}

let counterActive = false;
let tagScript: HTMLScriptElement | undefined;
let tagLoaded = false;

function requestScript() {
  if (tagScript) {
    return;
  }

  const script = document.createElement('script');

  tagScript = script;

  script.async = true;
  script.src = 'https://mc.yandex.ru/metrika/tag.js';

  script.onload = () => {
    tagLoaded = true;
  };

  script.onerror = () => {
    tagScript = undefined;
    tagLoaded = false;
    counterActive = false;

    window.ym?.a?.splice(0);
    script.remove();
  };

  document.head.append(script);
}

export function startMetrika() {
  if (!analyticsCounterId || counterActive) {
    return;
  }

  if (!window.ym) {
    const queue: Metrika = (...args) => {
      (queue.a ??= []).push(args);
    };

    queue.l = Date.now();
    window.ym = queue;
  }

  counterActive = true;

  window.ym(analyticsCounterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: false,
  });

  requestScript();
}

export function stopMetrika() {
  if (!analyticsCounterId || !counterActive) {
    return;
  }

  counterActive = false;

  if (!tagLoaded) {
    tagScript?.remove();
    tagScript = undefined;
    window.ym?.a?.splice(0);

    return;
  }

  window.ym?.(analyticsCounterId, 'destruct');
}
