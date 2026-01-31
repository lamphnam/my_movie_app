// src/components/DomainHandler.tsx
// Handles secondary domain (dpdns.org) by adding noindex and optionally redirecting

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '@/constants';

const DomainHandler = () => {
    const currentHost = typeof window !== 'undefined' ? window.location.host : '';
    const isSecondaryDomain = currentHost.includes('dpdns.org');

    useEffect(() => {
    // If on secondary domain and not already on primary, redirect immediately
    // This prevents issues with Vercel Analytics and other domain-specific features
    if (isSecondaryDomain && SITE_ORIGIN.includes('vercel.app')) {
      const currentPath = window.location.pathname + window.location.search;
      const canonicalUrl = `${SITE_ORIGIN}${currentPath}`;
      
      // Redirect immediately to primary domain
      console.warn(`⚠️ Redirecting from secondary domain to: ${canonicalUrl}`);
      window.location.replace(canonicalUrl);
    }, [isSecondaryDomain]);

    // Add noindex meta tag if on secondary domain
    if (isSecondaryDomain) {
        return (
            <Helmet>
                <meta name="robots" content="noindex,follow" />
            </Helmet>
        );
    }

    return null;
};

export default DomainHandler;
