// Site origin - configurable via environment variable
// Primary canonical domain: https://hnamphim.dpdns.org
export const SITE_ORIGIN =
  import.meta.env.VITE_SITE_ORIGIN || "https://hnamphim.dpdns.org";

// Legacy alias - kept for backwards compatibility
export const DOMAIN_URL = SITE_ORIGIN;
