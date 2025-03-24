/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'yewtgcfblvdxhrqhzsea.supabase.co',
                pathname: '/**',
            },
        ],
    },
};

export default nextConfig;
