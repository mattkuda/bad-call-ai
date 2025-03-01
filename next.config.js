/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'img.youtube.com',
            'www.nbra.net', // For referee images from NBRA website
            'a.espncdn.com', // For NBA team logos
        ],
    },
}

module.exports = nextConfig 