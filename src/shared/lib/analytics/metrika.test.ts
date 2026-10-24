import { beforeEach, describe, expect, it, vi } from 'vitest';

beforeEach(() => {
  vi.resetModules();
  vi.stubEnv('VITE_METRIKA_ID', '123456');
  document.head.replaceChildren();
  delete window.ym;

  const createElement = document.createElement.bind(document);

  vi.spyOn(document, 'createElement').mockImplementation((tagName, options) => {
    const element = createElement(tagName, options);

    if (tagName === 'script') {
      // Tests dispatch load/error explicitly instead of requesting a real analytics tag.
      element.setAttribute('type', 'application/x-test-script');
    }

    return element;
  });
});

describe('Metrika loader', () => {
  it('does not request the tag without a valid counter ID', async () => {
    vi.stubEnv('VITE_METRIKA_ID', '');

    const { startMetrika } = await import('./metrika');

    startMetrika();

    expect(document.querySelector('script')).toBeNull();
    expect(window.ym).toBeUndefined();
  });

  it('requests one tag and initializes one counter when called twice', async () => {
    const { startMetrika } = await import('./metrika');

    startMetrika();
    startMetrika();

    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(window.ym?.a).toEqual([
      [
        123456,
        'init',
        { clickmap: true, trackLinks: true, accurateTrackBounce: true, webvisor: false },
      ],
    ]);
  });

  it('cancels queued analytics if consent is withdrawn during loading', async () => {
    const { startMetrika, stopMetrika } = await import('./metrika');

    startMetrika();
    stopMetrika();

    expect(document.querySelector('script')).toBeNull();
    expect(window.ym?.a).toEqual([]);
  });

  it('stops a loaded counter and can reinitialize it without downloading another tag', async () => {
    const { startMetrika, stopMetrika } = await import('./metrika');

    startMetrika();
    document.querySelector('script')?.dispatchEvent(new Event('load'));

    const ym = vi.fn();

    window.ym = ym;
    stopMetrika();

    expect(ym).toHaveBeenCalledWith(123456, 'destruct');

    startMetrika();

    expect(ym).toHaveBeenCalledWith(123456, 'init', expect.any(Object));
    expect(document.querySelectorAll('script')).toHaveLength(1);
  });

  it('allows retrying a failed network request without stale initialization commands', async () => {
    const { startMetrika } = await import('./metrika');

    startMetrika();
    document.querySelector('script')?.dispatchEvent(new Event('error'));
    startMetrika();

    expect(document.querySelectorAll('script')).toHaveLength(1);
    expect(window.ym?.a).toHaveLength(1);
  });
});
