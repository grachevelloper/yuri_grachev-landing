import { act } from 'react';
import { renderToString } from 'react-dom/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../../test/render';
import { render as renderPage } from '../../../app/render';
import RevealSection from './RevealSection';

class ObserverMock implements IntersectionObserver {
  static instances: ObserverMock[] = [];

  readonly root = null;
  readonly rootMargin: string;
  readonly thresholds = [0];

  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = () => [];

  constructor(
    private callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit,
  ) {
    this.rootMargin = options?.rootMargin || '';
    ObserverMock.instances.push(this);
  }

  enter(target: Element) {
    const rect = target.getBoundingClientRect();

    this.callback(
      [
        {
          target,
          time: 0,
          rootBounds: null,
          boundingClientRect: rect,
          intersectionRect: rect,
          intersectionRatio: 1,
          isIntersecting: true,
        },
      ],
      this,
    );
  }
}

beforeEach(() => {
  ObserverMock.instances = [];
  vi.stubGlobal('IntersectionObserver', ObserverMock);
  vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
});

describe('section reveal', () => {
  it('includes every main section in the server HTML without scrolling', () => {
    const page = document.createElement('div');
    page.innerHTML = renderPage();
    const sectionIds = ['work', 'about', 'office', 'publications', 'contact', 'footer'];

    for (const id of sectionIds) {
      expect(page.querySelector(`#${id}`)?.textContent?.trim()).toBeTruthy();
    }

    expect(page.querySelector('a[href="https://t.me/rpa4e8"]')).not.toBeNull();
    expect(page.querySelector('img[loading="lazy"]')).not.toBeNull();
  });

  it('includes section text in HTML before any browser effects', () => {
    const html = renderToString(
      <RevealSection id="server-test">
        <p>Текст доступен без JavaScript</p>
      </RevealSection>,
    );

    expect(html).toContain('Текст доступен без JavaScript');
    expect(ObserverMock.instances).toHaveLength(0);
  });

  it('keeps offscreen content mounted while waiting to reveal it', async () => {
    vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(
      new DOMRect(0, 2000, 390, 400),
    );

    const { container } = await render(
      <RevealSection id="offscreen-test">
        <p>Текст нижнего раздела</p>
      </RevealSection>,
    );
    const target = container.querySelector('#offscreen-test');
    const observer = ObserverMock.instances[0];

    if (!target || !observer) {
      throw new Error('Section observer was not registered');
    }

    expect(container.textContent).toContain('Текст нижнего раздела');
    expect(target.className).toBe('');

    await act(() => observer.enter(target));

    expect(target.className).not.toBe('');
    expect(container.textContent).toContain('Текст нижнего раздела');
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });

  it('reveals and scrolls to a direct anchor', async () => {
    history.replaceState(null, '', '#direct-target');

    const { container } = await render(
      <RevealSection id="direct-target">
        <p>Целевой раздел</p>
      </RevealSection>,
    );

    expect(container.textContent).toContain('Целевой раздел');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('loads content when IntersectionObserver is unavailable', async () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');

    const { container } = await render(
      <RevealSection id="fallback-test">
        <p>Раздел без observer</p>
      </RevealSection>,
    );

    expect(container.textContent).toContain('Раздел без observer');
  });
});
