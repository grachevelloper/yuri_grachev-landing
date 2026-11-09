import { expect, it, vi } from 'vitest';

import { click, render } from '../../test/render';
import { useSectionNavigation } from './useSectionNavigation';

function Page() {
  useSectionNavigation();

  return (
    <>
      <a href="#contact">
        <span>Записаться</span>
      </a>
      <a href="#missing">Нет раздела</a>
      <section id="contact" tabIndex={-1}>
        Выбор мессенджера
      </section>
    </>
  );
}

it('scrolls and moves focus without changing URL or history', async () => {
  history.replaceState(null, '', '/?utm_source=telegram');
  const initialUrl = location.href;
  const historyLength = history.length;
  const scroll = vi.spyOn(Element.prototype, 'scrollIntoView').mockImplementation(() => {});
  const { container } = await render(<Page />);

  await click(container.querySelector('a span'));

  expect(scroll).toHaveBeenCalledWith({ block: 'start' });
  expect(document.activeElement?.id).toBe('contact');
  expect(location.href).toBe(initialUrl);
  expect(history.length).toBe(historyLength);
});

it('keeps modified clicks and unresolved anchors native', async () => {
  const { container } = await render(<Page />);
  const links = container.querySelectorAll('a');
  const modifiedClick = new MouseEvent('click', { bubbles: true, cancelable: true, ctrlKey: true });
  const missingClick = new MouseEvent('click', { bubbles: true, cancelable: true });

  links[0].dispatchEvent(modifiedClick);
  links[1].dispatchEvent(missingClick);

  expect(modifiedClick.defaultPrevented).toBe(false);
  expect(missingClick.defaultPrevented).toBe(false);
});
