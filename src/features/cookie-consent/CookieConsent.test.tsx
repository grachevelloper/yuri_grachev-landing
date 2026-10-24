import { beforeEach, describe, expect, it, vi } from 'vitest';

import { startMetrika, stopMetrika } from '../../shared/lib/analytics/metrika';
import { click, render } from '../../test/render';
import CookieConsent from './CookieConsent';

vi.mock('../../shared/lib/analytics/metrika', () => ({
  startMetrika: vi.fn(),
  stopMetrika: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(startMetrika).mockClear();
  vi.mocked(stopMetrika).mockClear();
});

describe('analytics consent', () => {
  it('does not start analytics before a choice or after refusal', async () => {
    const { container } = await render(<CookieConsent settingsOpen={false} onClose={vi.fn()} />);

    expect(startMetrika).not.toHaveBeenCalled();

    await click(container.querySelector('button'));

    expect(localStorage.getItem('analytics-consent')).toBe('declined');
    expect(startMetrika).not.toHaveBeenCalled();
    expect(container.querySelector('aside')).toBeNull();
  });

  it('starts analytics only after consent and remembers the choice', async () => {
    const { container } = await render(<CookieConsent settingsOpen={false} onClose={vi.fn()} />);

    await click(container.querySelectorAll('button')[1]);

    expect(localStorage.getItem('analytics-consent')).toBe('accepted');
    expect(startMetrika).toHaveBeenCalled();
    expect(container.querySelector('aside')).toBeNull();
  });

  it('lets a returning visitor withdraw consent from settings', async () => {
    localStorage.setItem('analytics-consent', 'accepted');

    const onClose = vi.fn();
    const { container, rerender } = await render(
      <CookieConsent settingsOpen={false} onClose={onClose} />,
    );

    expect(container.querySelector('aside')).toBeNull();

    await rerender(<CookieConsent settingsOpen onClose={onClose} />);
    await click(container.querySelector('button'));

    expect(stopMetrika).toHaveBeenCalledOnce();
    expect(localStorage.getItem('analytics-consent')).toBe('declined');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('keeps the current choice when browser storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new DOMException('Storage blocked');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new DOMException('Storage blocked');
    });

    const { container } = await render(<CookieConsent settingsOpen={false} onClose={vi.fn()} />);

    await click(container.querySelector('button'));

    expect(startMetrika).not.toHaveBeenCalled();
    expect(container.querySelector('aside')).toBeNull();
  });
});
