import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { click, render } from '../../../../test/render';
import WorkTopics from './WorkTopics';

describe('work topic accordions', () => {
  it('opens and closes topics independently on mobile', async () => {
    const media = window.matchMedia('(min-width: 900px)');

    Object.defineProperty(media, 'matches', { get: () => false });
    vi.spyOn(window, 'matchMedia').mockReturnValue(media);

    const { container } = await render(<WorkTopics />);
    const buttons = container.querySelectorAll('button');

    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');

    await click(buttons[1]);

    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[1].getAttribute('aria-expanded')).toBe('true');
    expect(container.querySelector('#work-topic-0')?.getAttribute('aria-hidden')).toBe('false');
    expect(container.querySelector('#work-topic-1')?.getAttribute('aria-hidden')).toBe('false');

    await click(buttons[1]);

    expect(buttons[1].getAttribute('aria-expanded')).toBe('false');
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(container.querySelector('#work-topic-1')?.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('#work-topic-1')?.hasAttribute('inert')).toBe(true);

    await click(buttons[2]);
    expect(buttons[0].getAttribute('aria-expanded')).toBe('true');
    expect(buttons[2].getAttribute('aria-expanded')).toBe('true');
  });

  it('shows all topics when the viewport switches to desktop', async () => {
    const media = window.matchMedia('(min-width: 900px)');
    let matchesDesktop = false;

    Object.defineProperty(media, 'matches', { get: () => matchesDesktop });
    vi.spyOn(window, 'matchMedia').mockReturnValue(media);

    const { container } = await render(<WorkTopics />);

    await act(() => {
      matchesDesktop = true;
      media.dispatchEvent(new Event('change'));
    });

    for (const button of container.querySelectorAll('button')) {
      expect(button.getAttribute('aria-expanded')).toBe('true');
      expect(button.disabled).toBe(true);
    }

    expect(container.querySelector('[aria-hidden="true"][id]')).toBeNull();
    expect(container.querySelector('[inert]')).toBeNull();
  });
});
