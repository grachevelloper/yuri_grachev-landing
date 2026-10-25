# Юрий Грачев — частная практика

Лендинг на React, TypeScript и Vite. Целевой адрес — https://rpa4e8.ru/.

## Запуск

Нужны Node.js 24 и npm.

```sh
npm ci
npm run dev
```

- `npm run verify` — форматирование, типы, тесты и сборка.
- `npm run build` — сборка в `dist/`.
- `npm run preview` — просмотр сборки локально.
- `npm run format` — форматирование кода.

## Где что менять

- Тексты — `src/sections/*/*.data.ts`.
- Контакты — `src/shared/config/contacts.ts`.
- Стили секций — соседние CSS Modules; общие стили — `src/app/styles/`.
- Изображения и шрифты — `src/assets/`.
- Политика — `privacy.html`, исходный документ — `public/privacy.pdf`.
- SEO — `index.html`, `privacy.html` и `config/siteMetadata.ts`.

Правила работы с кодом — в [AGENTS.md](AGENTS.md).

## Настройки и аналитика

[.env.production](.env.production) содержит публичные настройки: домен, путь `/` и ID Метрики `113778800`. Секреты в `VITE_*` хранить нельзя — эти значения доступны браузеру.

В разработке Метрика по умолчанию выключена. В production она запускается после согласия посетителя; изменить выбор можно в подвале. Вебвизор отключён.

Пример ссылки для учёта источника: `https://rpa4e8.ru/?utm_source=vk&utm_medium=social&utm_campaign=profile`.

## Публикация

Хостинг — GitHub Pages, репозиторий — `grachevelloper/yuri_grachev-landing`.

После отправки изменений в `main`: **Actions → Deploy to GitHub Pages → Run workflow → main**. Workflow проверяет код и публикует `dist/`. Обычный push запускает только CI.

В **Settings → Pages** должны быть выбраны **GitHub Actions**, домен `rpa4e8.ru` и **Enforce HTTPS** после выпуска сертификата. DNS управляется в REG.RU: [настройка записей для GitHub Pages](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site).

После деплоя проверьте главную, `/privacy.html`, `/robots.txt`, `/sitemap.xml` и поступление просмотров в Метрику. Код подтверждения Яндекс Вебмастера при необходимости задаётся переменной репозитория `VITE_YANDEX_VERIFICATION`.
