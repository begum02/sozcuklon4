import React, { useEffect } from 'react';

const AdSense = ({ adClient, adSlot, className = '', style = {} }) => {
    useEffect(() => {
        if (typeof window !== 'undefined' && window.adsbygoogle) {
            window.adsbygoogle.push({});
        }
    }, []);

    return (
        <ins
            className={`adsbygoogle ${className}`}
            style={{ display: 'block', ...style }}
            data-ad-client={adClient}
            data-ad-slot={adSlot}
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    );
};

export default AdSense;
