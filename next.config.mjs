/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')
const nextConfig = {
};

module.exports = withPWA({
    pwa: {
        dest: 'public',
        register: true,
        skipWaiting: true,
        disable: process.env.NODE_ENV === 'development'
    }
})

export default nextConfig;
