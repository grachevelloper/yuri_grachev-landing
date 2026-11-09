import { act } from 'react';
import { expect, it, vi } from 'vitest';

import { render } from '../../test/render';
import Header from './Header';

it('hides on downward scrolling, ignores jitter and returns on upward scrolling or at the top', async () => {
  vi.stubGlobal('scrollY', 0);
  const { container } = await render(<Header />);
  const header = container.querySelector('header');

  async function scroll(y: number) {
    await act(() => {
      vi.stubGlobal('scrollY', y);
      window.dispatchEvent(new Event('scroll'));
    });
  }

  expect(header?.dataset.hidden).toBe('false');
  await scroll(240);
  expect(header?.dataset.hidden).toBe('true');
  expect(header?.dataset.scrolled).toBe('true');
  await scroll(237);
  expect(header?.dataset.hidden).toBe('true');
  await scroll(220);
  expect(header?.dataset.hidden).toBe('false');
  await scroll(400);
  expect(header?.dataset.hidden).toBe('true');
  await scroll(0);
  expect(header?.dataset.hidden).toBe('false');
  expect(header?.dataset.scrolled).toBe('false');
});
