import { Component } from 'react';
import type { ReactNode } from 'react';

export default class SectionErrorBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <div className="container section" role="alert">
          <p>Не удалось загрузить раздел. Проверьте подключение к интернету.</p>

          <button className="button" onClick={() => location.reload()}>
            Попробовать снова
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
