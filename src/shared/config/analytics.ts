const configuredId = Number(import.meta.env.VITE_METRIKA_ID);

export const analyticsCounterId =
  Number.isSafeInteger(configuredId) && configuredId > 0 ? configuredId : undefined;
