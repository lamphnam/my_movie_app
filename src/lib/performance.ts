// src/lib/performance.ts

// Preconnect to critical origins
export const preconnectOrigins = () => {
  const origins = ["https://phim.nguonc.com", "https://images.weserv.nl"];

  origins.forEach((origin) => {
    const link = document.createElement("link");
    link.rel = "preconnect";
    link.href = origin;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
};

// DNS prefetch for external resources
export const dnsPrefetch = () => {
  const domains = ["https://phim.nguonc.com", "https://images.weserv.nl"];

  domains.forEach((domain) => {
    const link = document.createElement("link");
    link.rel = "dns-prefetch";
    link.href = domain;
    document.head.appendChild(link);
  });
};

// Resource hints for better performance
export const initPerformanceHints = () => {
  if (typeof window !== "undefined") {
    preconnectOrigins();
    dnsPrefetch();
  }
};
