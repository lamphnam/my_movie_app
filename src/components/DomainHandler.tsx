// src/components/DomainHandler.tsx
// Handles secondary domain (dpdns.org) by adding noindex and optionally redirecting

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { SITE_ORIGIN } from '@/constants';

const DomainHandler = () => {
    const currentHost = typeof window !== 'undefined' ? window.location.host : '';
    const isSecondaryDomain = currentHost.includes('dpdns.org');

    useEffect(() => {
        // If on secondary domain and not already on primary, optionally redirect
        // This is a fallback if Vercel redirects don't work
        if (isSecondaryDomain && SITE_ORIGIN.includes('vercel.app')) {
            const currentPath = window.location.pathname + window.location.search;
            const canonicalUrl = `${SITE_ORIGIN}${currentPath}`;

            // Show console message
            console.warn(`⚠️ You are on a secondary domain. Canonical URL: ${canonicalUrl}`);

            // Optional: Auto-redirect after a delay (uncomment to enable)
            // setTimeout(() => {
            //   window.location.href = canonicalUrl;
            // }, 2000);
        }
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
