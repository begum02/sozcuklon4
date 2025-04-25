import React from 'react';
import logo from '../src/assets/logo.svg'; // SVG dosyasýný dýþarýdan import ediyoruz.

function Logo({ width = 120, height = 120, alt = "Logo" }) {
    return (
        <div>
            <img
                src={logo}
                alt={alt}
                width={width}
                height={height}
                style={{ display: 'block' }} // Varsayýlan stil
            />
        </div>
    );
}

export default Logo;
