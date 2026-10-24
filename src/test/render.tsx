import { act } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { Root } from 'react-dom/client';
import { afterEach } from 'vitest';

const roots = new Set<Root>();

export async function render(component: ReactNode) {
  const container = document.createElement('div');

  document.body.append(container);

  const root = createRoot(container);

  roots.add(root);

  async function rerender(nextComponent: ReactNode) {
    await act(() => root.render(nextComponent));
  }

  await rerender(component);

  return { container, rerender };
}

export async function click(element: Element | null) {
  if (!(element instanceof HTMLElement)) {
    throw new Error('Expected a clickable HTML element');
  }

  await act(() => element.click());
}

afterEach(async () => {
  await act(() => {
    for (const root of roots) {
      root.unmount();
    }
  });

  roots.clear();
  document.body.replaceChildren();
});
