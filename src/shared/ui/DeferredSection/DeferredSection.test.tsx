import { act, lazy } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { render } from '../../../test/render';
import DeferredSection from './DeferredSection';

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

describe('deferred sections', () => {
  it('does not import a section until it approaches the viewport', async () => {
    const importer = vi.fn(async () => ({ default: () => <p>Загруженный раздел</p> }));
    const Section = lazy(importer);
    const { container } = await render(
      <DeferredSection id="deferred-test">
        <Section />
      </DeferredSection>,
    );

    expect(importer).not.toHaveBeenCalled();

    const observer = ObserverMock.instances.find((item) => item.rootMargin === '400px');
    const target = container.querySelector('#deferred-test');

    if (!observer || !target) {
      throw new Error('Section loading observer was not registered');
    }

    await act(() => observer.enter(target));

    expect(importer).toHaveBeenCalledOnce();
    expect(container.textContent).toContain('Загруженный раздел');
    expect(target.getAttribute('data-ready')).toBe('true');
  });

  it('loads a direct anchor target without waiting for viewport observation', async () => {
    history.replaceState(null, '', '#direct-target');

    const importer = vi.fn(async () => ({ default: () => <p>Целевой раздел</p> }));
    const Section = lazy(importer);
    const { container } = await render(
      <DeferredSection id="direct-target">
        <Section />
      </DeferredSection>,
    );

    expect(importer).toHaveBeenCalledOnce();
    expect(container.textContent).toContain('Целевой раздел');
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
  });

  it('loads content when IntersectionObserver is unavailable', async () => {
    Reflect.deleteProperty(window, 'IntersectionObserver');

    const { container } = await render(
      <DeferredSection id="fallback-test">
        <p>Раздел без observer</p>
      </DeferredSection>,
    );

    expect(container.textContent).toContain('Раздел без observer');
  });
});
