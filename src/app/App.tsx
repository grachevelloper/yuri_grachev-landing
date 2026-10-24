import { lazy, Suspense, useState } from 'react';

import Header from '../sections/header/Header';
import Hero from '../sections/hero/Hero';
import { analyticsCounterId } from '../shared/config/analytics';
import DeferredSection from '../shared/ui/DeferredSection/DeferredSection';

const Work = lazy(() => import('../sections/work/Work'));
const About = lazy(() => import('../sections/about/About'));
const Office = lazy(() => import('../sections/office/Office'));
const Publications = lazy(() => import('../sections/publications/Publications'));
const Contact = lazy(() => import('../sections/contact/Contact'));
const Footer = lazy(() => import('../sections/footer/Footer'));
const CookieConsent = lazy(() => import('../features/cookie-consent/CookieConsent'));

const hasAnalytics = analyticsCounterId !== undefined;

export default function App() {
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  return (
    <>
      <a className="button skip-link" href="#main">
        К содержимому
      </a>

      <Header />

      <main id="main">
        <Hero />

        <DeferredSection id="work">
          <Work />
        </DeferredSection>

        <DeferredSection id="about">
          <About />
        </DeferredSection>

        <DeferredSection id="office">
          <Office />
        </DeferredSection>

        <DeferredSection id="publications">
          <Publications />
        </DeferredSection>

        <DeferredSection id="contact">
          <Contact />
        </DeferredSection>
      </main>

      <DeferredSection id="footer">
        <Footer onCookieSettings={hasAnalytics ? () => setCookieSettingsOpen(true) : undefined} />
      </DeferredSection>

      {hasAnalytics && (
        <Suspense fallback={null}>
          <CookieConsent
            settingsOpen={cookieSettingsOpen}
            onClose={() => setCookieSettingsOpen(false)}
          />
        </Suspense>
      )}
    </>
  );
}
