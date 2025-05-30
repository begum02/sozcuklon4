import React from 'react';
import logo from '../src/assets/logo.svg'; // SVG dosyasını dışarıdan import ediyoruz.

function Logo({ width = 120, height = 120, alt = "Logo" }) {
    return (
        <div>
            <img
                src={logo}
                alt={alt}
                width={width}
                height={height}
                style={{ display: 'block' }} // Varsayılan stil
            />
        </div>
    );
}

export default Logo;
