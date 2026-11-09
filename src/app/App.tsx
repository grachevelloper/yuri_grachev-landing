import { lazy, Suspense, useEffect, useState } from 'react';

import Header from '../sections/header/Header';
import Hero from '../sections/hero/Hero';
import Work from '../sections/work/Work';
import About from '../sections/about/About';
import Office from '../sections/office/Office';
import Publications from '../sections/publications/Publications';
import Contact from '../sections/contact/Contact';
import Footer from '../sections/footer/Footer';
import { analyticsCounterId } from '../shared/config/analytics';
import RevealSection from '../shared/ui/RevealSection/RevealSection';

import { useSectionNavigation } from '../shared/hooks/useSectionNavigation';

const CookieConsent = lazy(() => import('../features/cookie-consent/CookieConsent'));

const hasAnalytics = analyticsCounterId !== undefined;

export default function App() {
  useSectionNavigation();

  const [mounted, setMounted] = useState(false);
  const [cookieSettingsOpen, setCookieSettingsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <a className="button skip-link" href="#main">
        К содержимому
      </a>

      <Header />

      <main id="main" tabIndex={-1}>
        <Hero />

        <RevealSection id="work">
          <Work />
        </RevealSection>

        <RevealSection id="about">
          <About />
        </RevealSection>

        <RevealSection id="office">
          <Office />
        </RevealSection>

        <RevealSection id="publications">
          <Publications />
        </RevealSection>

        <RevealSection id="contact">
          <Contact />
        </RevealSection>
      </main>

      <RevealSection id="footer">
        <Footer onCookieSettings={hasAnalytics ? () => setCookieSettingsOpen(true) : undefined} />
      </RevealSection>

      {hasAnalytics && mounted && (
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
