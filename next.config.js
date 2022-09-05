/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['avatars.dicebear.com', 'assets.stickpng.com'],
    },
};

module.exports = nextConfig;
