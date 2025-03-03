/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'img.youtube.com',
            'www.nbra.net', // For referee images from NBRA website
            'a.espncdn.com', // For NBA team logos
        ],
    },
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
        // Only apply in development mode
        if (dev && !isServer) {
            // Suppress client-side error overlays
            config.devtool = 'eval-source-map';
        }
        return config;
    },
}

module.exports = nextConfig 