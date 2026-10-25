import { useId, useState } from 'react';

import { contacts } from '../../config/contacts';
import { addressLinkContent } from './addressLink.data';

import styles from './AddressLink.module.css';

export default function AddressLink() {
  const tooltipId = useId();
  const [dismissed, setDismissed] = useState(false);

  return (
    <a
      className={styles.link}
      href={contacts.maps}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={contacts.address}
      aria-describedby={tooltipId}
      data-tooltip-dismissed={dismissed}
      onKeyDown={(event) => {
        if (event.key === 'Escape') setDismissed(true);
      }}
      onBlur={() => setDismissed(false)}
      onPointerLeave={() => setDismissed(false)}
    >
      <span>{contacts.address}</span>

      <svg
        className={styles.icon}
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>

      <span className={styles.tooltip} id={tooltipId} role="tooltip">
        {addressLinkContent.tooltip}
      </span>
    </a>
  );
}
