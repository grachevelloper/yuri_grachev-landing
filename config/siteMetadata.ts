import type { HtmlTagDescriptor, Plugin } from 'vite';

type SiteMetadataOptions = {
  siteUrl: URL;
  verificationCode?: string;
};

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

export function siteMetadata({ siteUrl, verificationCode }: SiteMetadataOptions): Plugin {
  if (verificationCode && !/^[a-z\d]+$/i.test(verificationCode)) {
    throw new Error('Invalid Yandex Webmaster verification code');
  }

  return {
    name: 'site-metadata',

    transformIndexHtml(html, context) {
      const isPrivacyPage = context.filename.endsWith('privacy.html');
      const pageUrl = new URL(isPrivacyPage ? 'privacy.html' : '', siteUrl).href;
      const title = html.match(/<title>([^<]+)<\/title>/)?.[1] || '';
      const description = html.match(/name="description"\s+content="([^"]+)"/)?.[1] || '';

      const tags: HtmlTagDescriptor[] = [
        { tag: 'link', attrs: { rel: 'canonical', href: pageUrl }, injectTo: 'head' },
      ];

      for (const [property, content] of Object.entries({
        'og:type': 'website',
        'og:locale': 'ru_RU',
        'og:url': pageUrl,
        'og:title': title,
        'og:description': description,
      })) {
        tags.push({ tag: 'meta', attrs: { property, content }, injectTo: 'head' });
      }

      if (verificationCode) {
        tags.push({
          tag: 'meta',
          attrs: { name: 'yandex-verification', content: verificationCode },
          injectTo: 'head',
        });
      }

      return tags;
    },

    generateBundle() {
      const urls = [siteUrl.href, new URL('privacy.html', siteUrl).href];
      const entries = urls.map((url) => `  <url><loc>${escapeXml(url)}</loc></url>`).join('\n');

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: [
          '<?xml version="1.0" encoding="UTF-8"?>',
          '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
          entries,
          '</urlset>\n',
        ].join('\n'),
      });

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: `User-agent: *\nAllow: /\nSitemap: ${new URL('sitemap.xml', siteUrl).href}\n`,
      });
    },
  };
}
