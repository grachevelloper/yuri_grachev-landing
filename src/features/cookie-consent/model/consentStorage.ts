export type AnalyticsConsent = 'accepted' | 'declined';

const storageKey = 'analytics-consent';

export function readAnalyticsConsent(): AnalyticsConsent | null {
  try {
    const value = localStorage.getItem(storageKey);

    return value === 'accepted' || value === 'declined' ? value : null;
  } catch {
    return null;
  }
}

export function saveAnalyticsConsent(value: AnalyticsConsent) {
  try {
    localStorage.setItem(storageKey, value);
  } catch {
    // The in-memory choice still applies when browser storage is unavailable.
  }
}
