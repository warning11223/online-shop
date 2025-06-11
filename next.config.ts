import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'dummyimage.com',
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: '/api/products',
                destination: 'http://o-complex.com:1337/products',
            },
            {
                source: '/api/order',
                destination: 'http://o-complex.com:1337/order',
            },
        ];
    },
};

export default nextConfig;
