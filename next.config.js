/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['cdn.builder.io'],
    },
    env: {
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
    }
}

module.exports = nextConfig
